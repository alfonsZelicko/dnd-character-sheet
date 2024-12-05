import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const toKebabCase = (string) => string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export default function (plop) {
  plop.setGenerator('component', {
    description: 'Create React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name?',
      },
      {
        type: 'input',
        name: 'directory',
        message: 'Where would you like to place it? (e.g., src/components)',
        default: '../src/components',
      },
    ],
    actions: (data) => {
      const actions = [];
      const componentDir = path.join(data.directory, toKebabCase(data.name));

      // Action: File creation
      actions.push({
        type: 'add',
        path: `${componentDir}/{{pascalCase name}}.tsx`,
        templateFile: 'plop-templates/component.hbs',
      });
      // Action: Index creation
      actions.push({
        type: 'add',
        path: `${componentDir}/index.ts`,
        template: `export * from './{{pascalCase name}}';`,
      });

      actions.push(() => {
        const gitAddPath = path.join('src', 'components', toKebabCase(data.name));
        try {
          execSync(`git add ${gitAddPath}`);
          return `Files in ${gitAddPath} added to git.`;
        } catch (error) {
          return `Failed to add files in ${gitAddPath} to git: ${error.message}`;
        }
      });

      actions.push(() => {
        const mainIndexPath = path.resolve('src/components/index.ts');
        const exportStatement = `export * from './${toKebabCase(data.name)}';\n`;

        try {
          if (fs.existsSync(mainIndexPath)) {
            const content = fs.readFileSync(mainIndexPath, 'utf8');
            if (!content.includes(exportStatement)) {
              fs.appendFileSync(mainIndexPath, exportStatement);
            }
          } else {
            fs.writeFileSync(mainIndexPath, exportStatement);
          }
          return `Main index file updated: ${mainIndexPath}`;
        } catch (error) {
          return `Failed to update main index file: ${error.message}`;
        }
      });

      return actions;
    },
  });
}
