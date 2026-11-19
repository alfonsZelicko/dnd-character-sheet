import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const REPOSITORY = 'https://github.com/MSanteler/5e-Tools.git'; //hope they will not remove it :-)
const CACHE_DIR = path.join(ROOT, '.cache', '5e-tools');
const SOURCE_DIR = path.join(CACHE_DIR, 'data', 'spells');
const TARGET_DIR = path.join(ROOT, 'src', 'data', 'spells');

/* this is a list of properties I am copying into the minimal output version*/
const MINIMAL_FIELDS = ['name', 'level', 'classes', 'school'] as const;

type OutputMode = 'minimal' | 'full';

const runGit = (args: string[], cwd = CACHE_DIR, options: { capture?: boolean } = {}) =>
  execFileSync('git', args, {
    cwd,
    stdio: options.capture ? 'pipe' : 'inherit',
    encoding: options.capture ? 'utf8' : undefined,
  });

const exists = async (file: string) => {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
};

function getOutputMode(): OutputMode {
  const args = process.argv.slice(2);

  if (args.length === 0) return 'minimal';

  // lazy solution, I know - but this script does nothing more :-)
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

async function fullSync() {
  await rm(TARGET_DIR, { recursive: true, force: true });
  await mkdir(path.dirname(TARGET_DIR), { recursive: true });
  await cp(SOURCE_DIR, TARGET_DIR, {
    recursive: true,
    filter: (source) => {
      const filename = path.basename(source);
      return !['foundry.json', 'roll20.json'].includes(filename);
    },
  });
}

async function getSpellFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getSpellFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.json') && /^spells(?:-.+)?\.json$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function processSpellFiles(output: OutputMode) {
  const files = await getSpellFiles(TARGET_DIR);

  for (const file of files) {
    const content: Record<string, unknown> = JSON.parse(await readFile(file, 'utf8'));

    if (!Array.isArray(content.spell)) {
      throw new Error(`Missing spell array in ${file}`);
    }

    content.spell = content.spell.map((spell: unknown, index: number) => {
      if (!spell || typeof spell !== 'object' || Array.isArray(spell)) {
        throw new Error(`Invalid spell object at index ${index} in ${file}`);
      }

      const spellData = spell as Record<string, unknown>;

      if (typeof spellData.name !== 'string') {
        throw new Error(`Missing or invalid spell name at index ${index} in ${file}`);
      }

      const searchName = spellData.name.toLowerCase(); //for filter purpose only

      if (output === 'minimal') {
        const minimalSpell = Object.fromEntries(
          MINIMAL_FIELDS.filter((field) => field in spellData).map((field) => [field, spellData[field]])
        );

        return {
          ...minimalSpell,
          searchName,
        };
      }

      return {
        ...spellData,
        searchName,
      };
    });

    await writeFile(file, JSON.stringify(content));
  }

  console.log(`Processed ${files.length} spell files (${output} mode).`);
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

  await processSpellFiles(output);
}

const output = getOutputMode();

syncSpells(output).catch((error) => {
  console.error('Spell synchronization failed:', error.message);
  process.exitCode = 1;
});
