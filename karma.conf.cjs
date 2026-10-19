const fs = require('fs');
// En Linux CI/root, Chrome necesita --no-sandbox. En Windows usa Chrome instalado.
if (process.platform === 'linux' && !process.env.CHROME_BIN && fs.existsSync('/usr/bin/chromium')) {
  process.env.CHROME_BIN = '/usr/bin/chromium';
}
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [{ pattern: 'tests/**/*.spec.js', watched: false }],
    preprocessors: { 'tests/**/*.spec.js': ['esbuild'] },
    plugins: ['karma-jasmine', 'karma-chrome-launcher', 'karma-esbuild'],
    esbuild: {
      target: 'es2020',
      bundle: true,
      jsx: 'automatic',
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      define: { 'process.env.NODE_ENV': '"test"' },
      singleBundle: true
    },
    reporters: ['progress'],
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox', '--disable-dev-shm-usage'] }
    },
    browserNoActivityTimeout: 60000,
    singleRun: true,
    colors: true
  });
};
