const path = require('path')
const VisualRegressionCompare = require('wdio-visual-regression-service/compare')

function getScreenshotName (basePath) {
  return function(context) {
    var type = context.type
    var testName = context.test.title
    var browserVersion = parseInt(context.browser.version, 10)
    var browserName = context.browser.name
    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}.png`)
  }
}

exports.config = {
  specs: [
    './test/test-*.js'
  ],
  exclude: [],

  maxInstances: 10,
  capabilities: (() => {
    switch (process.platform) {
      case 'win32': {
        return [
          { browserName: 'chrome' },
          { browserName: 'edge' },
          { browserName: 'firefox'},
          { browserName: 'ie' },
        ];
      }
      case 'darwin': {
        return [
          { browserName: 'chrome' },
          { browserName: 'firefox' },
          { browserName: 'safari'},
        ];
      }
      default: {
        return [
          { browserName: 'chrome' },
          { browserName: 'firefox' },
        ];
      }
    }
  })(),

  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  bail: 0,

  screenshotPath: './screenshots/',

  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  services: [
    'selenium-standalone',
    'visual-regression',
  ],

  visualRegression: {
    compare: new VisualRegressionCompare.LocalCompare({
      referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
      screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
      diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
      misMatchTolerance: 0.01,
    }),
    viewportChangePause: 300,
    widths: [320, 480, 640, 1024],
    orientations: ['landscape', 'portrait'],
  },

  framework: 'mocha',
  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    compilers: ['babel-core/register']
  },
}
