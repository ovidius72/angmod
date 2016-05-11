/**
 * gulpfile.js
 * @type       {Function}
 */
//TODO: split tasks into separate files.

var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs');
var path = require('path');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var del = require('del');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var extract = require('gulp-html-extract');
var replace = require('gulp-replace');
var taskReplace = require('gulp-replace-task');

//ES6
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var ngAnnotate = require('gulp-ng-annotate');

//tests
var Server = require('karma').Server;

//Scaffolds
var yargs = require('yargs').argv;
var template = require('gulp-template');


//Apps
var clientPath = path.join(__dirname, 'client');
var appsPath = path.join(clientPath, 'apps');
var sharedPath = path.join(clientPath, 'shared');
var dist = '../dist';
var appBuilt = 0;

//Drupal module
var modulePath = path.join(__dirname, '../../');
var drupalTemplates = path.join(modulePath, 'templates');
var drupalFiles = path.join(modulePath, 'includes');

var distPath = {
  js: path.join(dist, 'js'),
  jsMaps: path.join(dist, 'js', 'maps'),
  css: path.join(dist, 'css'),
  cssMaps: path.join(dist, 'css', 'maps'),
  templates: path.join(dist, 'templates'),
};

/** GENERATOR **/
var scaffoldPath = path.join(__dirname, 'scaffolds');
var templatesPath = {
  app: path.join(scaffoldPath, 'app/**/*.**'),
  component: path.join(scaffoldPath, 'component/**/*.**'),
  service: path.join(scaffoldPath, 'service/**/*.**'),
  filter: path.join(scaffoldPath, 'filter/**/*.**'),
  drupal: path.join(scaffoldPath, 'drupal/name.tpl.php'),
  drupalMenu: path.join(scaffoldPath, 'drupal/menu.php')
};

/**
 * Template generator function.
 *
 * Takes two required arguments
 * --a, --app: the app name or shared, If none is passed the default is 'shared'.
 * --n, --name (the component name)
 * --s, --sub (Optional sub-folder structure. (e.g. foo/bar, foo/bar/baz))
 * --t, --type (component type)
 * --c: --component (default)
 * --f: --filter
 * --s, --service
 * --m, --menu (menu item name (for apps))
 * --d, --dest (Drupal Menu Destination (Admin or Frontend) !!TODO:STILL NOT FULLY IMPLEMENTED.
 */
var generator = function (args) {
  "use strict";

  var cap = function (val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  var app = args.a || args.app || 'shared';
  var name = args.n || args.name;
  var type = args.t || args.type || 'component';
  var sub = args.s || args.sub || '';
  var menuDest = yargs.d || yargs.dest || 'frontend';
  var menuPath = yargs.menu || yargs.m || null;

  var menuType = menuDest == 'a' || menuDest == 'admin' ? 'admin' : 'frontend';
  var drupalTemplateDest = path.join(drupalTemplates, menuType);

  if (typeof name === 'undefined' || typeof name !== 'string' || name.length < 2) {
    gutil.log(gutil.colors.red('--name argument is required and must have at least 2 letters'));
    return false;
  }

  var typePlural = type + 's';
  var upperCaseName = cap(name);
  var lowerCaseName = name.toLowerCase();
  var camelCaseName = name.charAt(0).toLowerCase() + name.slice(1);

  app = app.toLowerCase();
  type = type.toLowerCase();

  var namespace = path.join('app', app, typePlural, sub, lowerCaseName).split('/').join('.');

  var dest = app == 'shared' ?
    path.join(sharedPath, typePlural, sub, camelCaseName) :
    path.join(appsPath, app, typePlural, sub, camelCaseName);

  if (type == 'app') {
    //Check if app already exists
    try {
      fs.accessSync(path.join(appsPath, name), fs.F_OK);
      gutil.log(gutil.colors.magenta('An app with the same name (%s) already exists. Exiting...', name));
      return false;
    }
    catch (e) {
      //can't access to the directory, so the app doesn't exists.
      gutil.log('App %s doesn\'t exists.', name);
      app = '';
      dest = path.join(appsPath, camelCaseName);
      namespace = path.join('app', lowerCaseName).split('/').join('.');
    }
  }


  var names = {
    name: name,
    Name: upperCaseName,
    camelCaseName: camelCaseName,
    lowerCaseName: lowerCaseName,
    namespace: namespace
  };

  var result = createTemplate(templatesPath[type], names, dest);

  //If menu is passed, a drupal template will be also created.
  if (menuPath) {
    createTemplate(templatesPath['drupal'], names, drupalTemplateDest);
    createMenuItem(names);
    createMenuCallback(names);
    createThemeFunction(names, 'frontend');
    gutil.log(gutil.colors.green(':::> Drupal template %s created'), names.lowerCaseName);
    gutil.log(gutil.colors.green(':::> Drupal menu item %s created'), names.lowerCaseName);
    gutil.log(gutil.colors.red(':::> Clear the cache of you Drupal website to acces the new path'));
  }

  gutil.log(gutil.colors.green(":::> New %s (%s) created at %s"), type, name, dest);
  gutil.log(gutil.colors.green(':::> Run [gulp build] to compile the new code.'));

  return result;
};

/**
 * Create a new array passed to Drupal hook_theme()
 * @param names
 * @param destination
 * @returns {*}
 */
function createThemeFunction(names, destination) {
  "use strict";
  var item = "'" + names.lowerCaseName + "' => array(\n" +
    "\t\t'variables' => array(\n" +
    "\t),\n" +
    "\t\t'template' => '" + names.lowerCaseName + "',\n" +
    "\t\t'path' => $path . '/templates/" + destination + "',\n" +
    "\t),\n" +
    "\t//@newThemeFunction//";

  var themeGlob = path.join(drupalFiles, 'theme.inc');
  return gulp.src(themeGlob)
    .pipe(replace("//@newThemeFunction//", item))
    .pipe(gulp.dest(drupalFiles));
}

/**
 * Create a new menu item passed to Drupal hook_menu()
 * @param names: Object containing case sensitive names.
 * @returns {*}
 */
function createMenuItem(names) {
  "use strict";
  var item = "$items['" + names.lowerCaseName + "'] = array( \n" +
    "\t'title' => t('" + names.Name + "'),\n" +
    "\t'description' => t('" + names.Name + " page'),\n" +
    "\t'page callback' => 'angmod_" + names.lowerCaseName + "_page',\n" +
    "\t'access callback' => 'user_access',\n" +
    "\t'access arguments' => array('access content'),\n" +
    "\t'type' => MENU_NORMAL_ITEM\n" +
    ");\n" +
    "\n" +
    "//@newMenuPlaceholder//" +
    "\n";
  var menuGlob = path.join(drupalFiles, 'menu.inc');
  return gulp.src(menuGlob)
    .pipe(replace("//@newMenuPlaceholder//", item))
    .pipe(gulp.dest(drupalFiles));
}

/**
 * Generate a Drupal menu item callback.
 * @param names: object containing a lowerCaseName
 * @returns {*}
 */
function createMenuCallback(names) {
  "use strict";
  var item = "function angmod_" + names.lowerCaseName + "_page() {\n" +
    "\tangular_include_scripts('" + names.lowerCaseName + "');\n" +
    "\treturn theme('" + names.lowerCaseName + "');\n" +
    "}\n\n" +
    "//@newCallbackPlaceholder//" +
    "\n";

  var callbackGlob = path.join(drupalFiles, 'callbacks.inc');
  return gulp.src(callbackGlob)
    .pipe(replace("//@newCallbackPlaceholder//", item))
    .pipe(gulp.dest(drupalFiles));
}

/**
 * Helper function.
 * General templates builder function.
 */
function createTemplate(source, names, destination) {
  "use strict";
  var result = gulp.src(source)
    .pipe(template(names))
    .pipe(rename(function (path) {
      "use strict";
      path.basename = path.basename.replace('name', names.camelCaseName);
    }))
    .pipe(gulp.dest(destination));
}

/**
 * Generate a new angular app
 */
gulp.task('gen:app', function () {
  yargs.type = 'app';
  return generator(yargs);
});

/**
 * Generate a new angular component.
 * No --name argument passed means 'Component'
 */
gulp.task('gen', function () {
  yargs.type = 'component';
  return generator(yargs);
});

/**
 * Generate a new angular component.
 */
gulp.task('gen:component', function () {
  yargs.type = 'component';
  return generator(yargs);
});

/**
 * Generate a new angular service
 */
gulp.task('gen:service', function () {
  yargs.type = 'service';
  return generator(yargs);
});

/**
 * Generate a new angular filter.
 */
gulp.task('gen:filter', function () {
  yargs.type = 'filter';
  return generator(yargs);
});

//** End generator. **/

/**
 * Helper function.
 * Retrive all apps in the client/apps folder.
 */
function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function (file) {
      return (fs.statSync(path.join(dir, file)).isDirectory() && file != 'shared' && file != 'templates');
    });
}

function compileAllApps() {
  "use strict";
  var i,
    folders = getFolders(appsPath);

  for (i = 0; i < folders.length; i++) {
    compile(false, folders[i]);
  }
}

/**
 * Helper function.
 * Compile Angular ES6
 */
function compile(mustWatch, app) {
  var bundler = watchify(
    browserify(appsPath + '/' + app + '/app.js',
      {debug: true}
    ).transform(babel, {presets: ['es2015']})
  );

  var lowerCaseName = app.toLowerCase();

  function rebundle() {
    gutil.log(gutil.colors.green('>>> Bundling', app));
    bundler.bundle()
      .on('error', function (err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source('app.' + lowerCaseName + '.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(ngAnnotate())
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest(distPath.js))
      .on('end', function () {
        appBuilt += 1;
        canReload();
      })
//      .pipe(livereload());

  }

  if (mustWatch) {
    gutil.log('-> Bundling and watching...');
    bundler.on('update', function () {
      rebundle();
    });
  }

  gutil.log(gutil.colors.gray('>>> Compiling', app));
  rebundle();
}

/**
 *Helper function
 * Transpile ES6 code. and watch for changing.
 */
function es6_watch(app) {
  compile(false, app);
};

//Reload App scripts after app built is completed.
function canReload() {
  var totalApps = getFolders(appsPath).length;
  gutil.log(gutil.colors.cyan('Built %d of %d app(s)'), appBuilt, totalApps);

  if (appBuilt == totalApps) {
    livereload.reload('All Apps')
    appBuilt = 0;
  }

}


/**
 * Gulp Task.
 * Transpile ES6 code and watch for changing.
 */
gulp.task('watch', function () {
  var i,
    folders = getFolders(appsPath);

  for (i = 0; i < folders.length; i++) {
    es6_watch(folders[i]);
  }
});

/**
 * Compile .jade template into html.
 */
gulp.task('jade', function () {
  return gulp.src(clientPath + '/**/*.jade')
    .pipe(jade({
      pretty: true,
    }))
    .pipe(rename(function (file) {
      file.dirname = ''
      return file.basename + file.extname;
    }))
    .pipe(gulp.dest(distPath.templates))
    .pipe(livereload());
});

/**
 * Gulp task.
 * Compile sass and scss files into css.
 */
gulp.task('sass', function () {
  return gulp.src('./sass/custom_style.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errToconsole: true,
      includePaths: require('node-bourbon').includePaths,
      output: 'nested',
      //sourceComments: 'normal',
      onsuccess: {},
      onError: {}
    })).on('error', sass.logError)
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(distPath.css));
//    .pipe(livereload());

});

/**
 * Gulp task.
 * Compile sass and scss files into css.
 */
gulp.task('sass-print', function () {
  return gulp.src('./sass/custom_style.print.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errToconsole: true,
      includePaths: require('node-bourbon').includePaths,
      output: 'nested',
      //sourceComments: 'normal',
      onsuccess: {},
      onError: {}
    })).on('error', sass.logError)
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(distPath.css));
});

/**
 * Extract t() functions from compiled html files
 * and generate a new js file containing all translatable strings.
 */
gulp.task('extract-t', function () {
  return gulp.src(distPath.templates + '/**/*.html')
    .pipe(extract({
      sel: "t",
      strip: true
    }))
    .pipe(replace('{{', ''))
    .pipe(replace('}}', ''))
    .pipe(replace('vm', 'Drupal'))
    .pipe(concat("language.js"))
    .pipe(gulp.dest('js'));
});

/**
 * Add the translatable strings to a Drupal.behaviour.angmod funcion
 * making them available for translation in the Drupal UI
 */
gulp.task('inject-lang', function () {
  return gulp.src('./js/language.drupal.js')
    .pipe(taskReplace({
      patterns: [
        {
          match: 'include',
          replacement: fs.readFileSync('js/language.js', 'utf8')
        }
      ]
    }))
    .pipe(gulp.dest(distPath.js));
});

/**
 * Gulp task
 * Run testing angular code.
 */
gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    autoWatch: true,
  }, done()).start();
})

gulp.task('clean:templates', function () {
  "use strict";
  return del(distPath.templates + '/*.html', {force: true}).then(paths => {
    console.log('Deleting templates: \n', paths.join('\n'));
  });
  ;
});

gulp.task('clean:apps', function () {
  "use strict";
  return del([
    distPath.jsMaps + '/*.map',
    distPath.js + '/app.*.js',
    distPath.js + '/language.drupal.js'
  ], {force: true}).then(paths => {
    console.log('Deleting js: \n', paths.join('\n'));
  });
});

gulp.task('clean:css', function () {
  "use strict";
  return del([
    distPath.css + '/*.css',
    distPath.cssMaps + '/*.map'
  ], {force: true}).then(paths => {
    console.log('Deleting css: \n', paths.join('\n'));
  });
});

gulp.task('clean:all', ['clean:css', 'clean:apps', 'clean:templates']);

//watch for changes using LiveReload
gulp.task('live', function () {
  livereload.listen();

  //Watch sass files
  gulp.watch('sass/**/*.{sass,scss}', ['sass', 'sass-print']);

  //watch for source scripts
  gulp.watch('client/**/*.js', ['watch']);

  //watch for build scripts
//  gulp.watch(distPath.js + '/*.js').on('change', livereload.changed);

  //watch jade files
  gulp.watch('client/**/*.jade', ['jade', 'extract-t', 'inject-lang']);

  //watch for css file changes.
  gulp.watch(distPath.css + '/**/*.css').on('change', livereload.changed);
});

/**
 * Gulp default task.
 */
gulp.task('default', ['watch', 'jade', 'sass', 'sass-print', 'extract-t', 'inject-lang', 'live']);

/**
 *Generate Angular E6.
 */
gulp.task('build', ['clean:all', 'jade', 'sass', 'sass-print', 'extract-t', 'inject-lang'], function () {
  compileAllApps();
  process.exit(0);
});
