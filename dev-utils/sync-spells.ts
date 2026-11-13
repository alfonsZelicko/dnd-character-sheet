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
const OUTPUT_STATE_FILE = path.join(ROOT, '.cache', 'spells-sync-output');

const MINIMAL_FIELDS = ['name', 'level', 'classes'] as const;

type OutputMode = 'minimal' | 'full';

const runGit = (args: string[], cwd = CACHE_DIR, options: { capture?: boolean } = {}) =>
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

function getOutputMode(): OutputMode {
  const args = process.argv.slice(2);

  if (args.length === 0) return 'minimal';

  if (args.length === 2 && args[0] === '--output') {
    if (args[1] === 'minimal' || args[1] === 'full') {
      return args[1];
    }
  }

  throw new Error('Usage: sync-spells [--output minimal|full]');
}

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

  await Promise.all([
    rm(path.join(TARGET_DIR, 'foundry.json'), { force: true }),
    rm(path.join(TARGET_DIR, 'roll20.json'), { force: true }),
  ]);
}

async function getJsonFiles(directory: string): Promise<string[]> {
  const excludedFiles = ['foundry.json', 'roll20.json'];
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getJsonFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.json') && !excludedFiles.includes(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}
async function minimizeSpells() {
  const files = (await getJsonFiles(TARGET_DIR)).filter((file) => /^spells(?:-.+)?\.json$/i.test(path.basename(file)));

  for (const file of files) {
    const content = JSON.parse(await readFile(file, 'utf8'));

    if (!Array.isArray(content.spell)) {
      throw new Error(`Missing spell array in ${file}`);
    }

    content.spell = content.spell.map((spell: Record<string, unknown>) =>
      Object.fromEntries(MINIMAL_FIELDS.filter((field) => field in spell).map((field) => [field, spell[field]]))
    );

    await writeFile(file, JSON.stringify(content));
  }

  console.log(`Minimized ${files.length} spell files.`);
}

async function syncSpells(output: OutputMode) {
  if (!(await exists(path.join(CACHE_DIR, '.git')))) {
    if (await exists(CACHE_DIR)) {
      throw new Error('Cache directory exists but is not a Git repository.');
    }

    await cloneRepository();
  }

  runGit(['pull', '--ff-only']);

  // Always rebuild generated spell data.
  await fullSync();

  if (output === 'minimal') {
    await minimizeSpells();
  }
}

const output = getOutputMode();

syncSpells(output).catch((error) => {
  console.error('Spell synchronization failed:', error.message);
  process.exitCode = 1;
});
