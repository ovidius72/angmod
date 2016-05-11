// karma config file - project - test AngularJs
module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['browserify', 'jasmine'],

    plugins: [
      'karma-browserify',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
//      'karma-babel-preprocessor'
    ],
    // start these browsers
    browsers: ['PhantomJS'],
//    reporters: ['progress'], //'coverage'],
    preprocessors: {
      'client/**/*.js': ['browserify'] //, 'coverage']
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    },
    exclude: [
    ],
    preprocessors: {
      'client/**/*.js': ['browserify'],
//      'client/**/*.spec.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: ['babelify', 'stringify'],
      presets: ['es2015']
    },
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'client/apps/auctions/**/*.js',
      'client/apps/auctions/**/*.spec.js'
    ],
    logLevel: config.LOG_WARN,
    singleRun: false,
    colors: true
  });
};
