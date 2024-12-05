import { visualizer } from 'rollup-plugin-visualizer';
import { build } from 'vite';
import { join } from 'path';

(async () => {
  try {
    const buildUtilsFolderName = 'dev-utils';

    // Run the build process with the visualizer plugin
    await build({
      plugins: [
        visualizer({
          open: true,
          filename: join(buildUtilsFolderName, 'bundle-analysis-graph.html'),
          template: 'treemap',
        }),
      ],
    });

    console.log('Visualizer stats generated successfully!');
  } catch (error) {
    console.error('Failed to generate visualizer stats:', error);
    process.exit(1);
  }
})();
