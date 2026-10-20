const fs = require('node:fs');
const path = require('node:path');
const { createInstrumenter } = require('istanbul-lib-instrument');

// Esta configuración NO modifica la ejecución habitual de `npm test`.
// Solo instrumenta archivos de src/ realmente incluidos en el bundle de pruebas.
const root = path.join(__dirname, 'src') + path.sep;
const instrumenter = createInstrumenter({
  esModules: true,
  compact: false,
  parserPlugins: ['jsx'], // Permite instrumentar componentes React con JSX
  coverageVariable: '__coverage__',
});

const coveragePlugin = {
  name: 'cachimba-istanbul-coverage',
  setup(build) {
    build.onLoad({ filter: /\.[cm]?[jt]sx?$/ }, async (args) => {
      if (!args.path.startsWith(root)) return;
      const source = await fs.promises.readFile(args.path, 'utf8');
      const relativePath = path.relative(__dirname, args.path).split(path.sep).join('/');
      return {
        contents: instrumenter.instrumentSync(source, relativePath),
        loader: /\.jsx$/.test(args.path) ? 'jsx' : 'js',
        resolveDir: path.dirname(args.path),
      };
    });
  },
};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [{ pattern: 'tests/**/*.spec.js', watched: false }],
    preprocessors: { 'tests/**/*.spec.js': ['esbuild'] },
    plugins: ['karma-jasmine', 'karma-chrome-launcher', 'karma-esbuild', 'karma-coverage'],
    esbuild: {
      target: 'es2020',
      bundle: true,
      jsx: 'automatic',
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      define: { 'process.env.NODE_ENV': '"test"' },
      singleBundle: true,
      plugins: [coveragePlugin],
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'json-summary', subdir: '.' },
      ],
    },
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox', '--disable-dev-shm-usage'] },
    },
    browserNoActivityTimeout: 60000,
    singleRun: true,
    colors: true,
  });
};
