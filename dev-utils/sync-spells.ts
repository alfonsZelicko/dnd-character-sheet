import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import type { PathLike } from 'node:fs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const REPOSITORY = 'https://github.com/MSanteler/5e-Tools.git';
const CACHE_DIR = path.join(ROOT, '.cache', '5e-tools');
const SOURCE_DIR = path.join(CACHE_DIR, 'data', 'spells');
const TARGET_DIR = path.join(ROOT, 'src', 'data', 'spells');
const STATE_FILE = path.join(ROOT, '.cache', 'spells-sync-state');

const runGit = (args: string[], cwd = CACHE_DIR, options: { capture?: boolean } = {}): string | Buffer =>
  execFileSync('git', args, {
    cwd,
    stdio: options.capture ? 'pipe' : 'inherit',
    encoding: options.capture ? 'utf8' : undefined,
  });

const exists = async (file: PathLike) => {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
};

const getCurrentCommit = () => String(runGit(['rev-parse', 'HEAD'], CACHE_DIR, { capture: true })).trim();

async function cloneRepository() {
  await mkdir(path.dirname(CACHE_DIR), { recursive: true });
  runGit(['clone', '--filter=blob:none', '--sparse', REPOSITORY, CACHE_DIR], ROOT);
  runGit(['sparse-checkout', 'set', '--no-cone', '/data/spells/']);
}

async function removeEmptyParents(directory: PathLike) {
  while (directory !== TARGET_DIR) {
    try {
      const entries = await readdir(directory);

      if (entries.length > 0) break;

      await rm(directory, { recursive: true });
      if (typeof directory === 'string') {
        directory = path.dirname(directory);
      }
    } catch {
      break;
    }
  }
}

async function copyChangedFiles(previousCommit: string, currentCommit: string) {
  let changedFiles;

  try {
    changedFiles = String(
      runGit(['diff', '--name-only', '-z', previousCommit, currentCommit, '--', 'data/spells'], CACHE_DIR, {
        capture: true,
      })
    )
      .split('\0')
      .filter(Boolean);
  } catch {
    return false;
  }

  for (const file of changedFiles) {
    const relativePath = path.relative('data/spells', file);

    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      throw new Error(`Invalid source path: ${file}`);
    }

    const source = path.join(CACHE_DIR, file);
    const target = path.join(TARGET_DIR, relativePath);

    if (await exists(source)) {
      await mkdir(path.dirname(target), { recursive: true });
      await cp(source, target);
    } else {
      await rm(target, { force: true });
      await removeEmptyParents(path.dirname(target));
    }
  }

  return true;
}

async function fullSync() {
  await rm(TARGET_DIR, { recursive: true, force: true });
  await mkdir(path.dirname(TARGET_DIR), { recursive: true });
  await cp(SOURCE_DIR, TARGET_DIR, { recursive: true });
}

async function syncSpells() {
  if (!(await exists(path.join(CACHE_DIR, '.git')))) {
    if (await exists(CACHE_DIR)) {
      throw new Error('Cache directory exists but is not a Git repository.');
    }

    await cloneRepository();
  }

  const previousCommit = (await exists(STATE_FILE)) ? (await readFile(STATE_FILE, 'utf8')).trim() : null;

  runGit(['pull', '--ff-only']);

  const currentCommit = getCurrentCommit();

  if (!previousCommit) {
    await fullSync();
  } else if (previousCommit !== currentCommit) {
    const synced = await copyChangedFiles(previousCommit, currentCommit);

    if (!synced) {
      await fullSync();
    }
  }

  await writeFile(STATE_FILE, currentCommit);
}

syncSpells().catch((error) => {
  console.error('Spell synchronization failed:', error.message);
  process.exitCode = 1;
});
