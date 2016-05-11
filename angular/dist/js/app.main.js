(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AppComponent = function AppComponent(AppSettings) {
  "ngInject";

  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + 'app.main.html'
  };
};
AppComponent.$inject = ["AppSettings"];

exports.default = AppComponent;

},{}],2:[function(require,module,exports){
'use strict';

var _appComponent = require('./app.component.js');

var _appComponent2 = _interopRequireDefault(_appComponent);

var _components = require('./components/components');

var _components2 = _interopRequireDefault(_components);

var _shared = require('./../../shared/shared.module');

var _shared2 = _interopRequireDefault(_shared);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app.main', ['ui.router', 'ngAnimate', 'ngSanitize', 'ngMaterial', _shared2.default.name, _components2.default.name]).directive('app', _appComponent2.default).config(["$httpProvider", "$mdIconProvider", "$mdThemingProvider", function ($httpProvider, $mdIconProvider, $mdThemingProvider) {
  "use strict";

  //Theming

  $mdThemingProvider.definePalette('MyPalette', {
    '50': '#ffffff',
    '100': '#f9e4e0',
    '200': '#efbbb1',
    '300': '#e38776',
    '400': '#de715c',
    '500': '#d95b43',
    '600': '#d3462b',
    '700': '#b93d25',
    '800': '#a03520',
    '900': '#862c1b',
    'A100': '#ffffff',
    'A200': '#f9e4e0',
    'A400': '#de715c',
    'A700': '#b93d25',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
  });

  $mdThemingProvider.theme('default').primaryPalette('MyPalette');
  //      .accentPalette('MyAccentPalette');
}]).run(['$rootScope', '$state', function ($rootScope, $state, $stateParams) {
  "ngInject";

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on('$stateChangeStart', function () {
    $rootScope.stateIsLoading = true;
  });

  $rootScope.$on('$stateChangeSuccess', function () {
    $rootScope.stateIsLoading = false;
  });
}]);

},{"./../../shared/shared.module":29,"./app.component.js":1,"./components/components":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _navbar = require('./navbar/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _home = require('./home/home');

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppComponents = angular.module('app.components', [_home2.default.name, _navbar2.default.name]);

exports.default = AppComponents;

},{"./home/home":6,"./navbar/navbar":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = require('./home.controller');

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomeComponent = function HomeComponent(AppSettings) {
  "ngInject";

  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + 'main.home.html',
    controller: _home2.default,
    controllerAs: "vm",
    scope: {}
  };
};
HomeComponent.$inject = ["AppSettings"];

exports.default = HomeComponent;

},{"./home.controller":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeController =
/*@ngInject*/

["$rootScope", "$scope", "AppSettings", "$sce", "LocaleFactory", function HomeController($rootScope, $scope, AppSettings, $sce, LocaleFactory) {
  _classCallCheck(this, HomeController);

  //common features.
  this.settings = AppSettings;
  this.trustAsHtml = $sce.trustAsHtml;
  this.t = Drupal.t;
  this.locale = LocaleFactory;
  this.name = 'HomeController';
}];

exports.default = HomeController;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = require('./home.component');

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomeModule = angular.module('app.components.home', []).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
  "ngInject";

  $urlRouterProvider.otherwise('/');
  // $urlRouterProvider.otherwise('404');

  $stateProvider.state('home', { //App Home Page
    url: '/',
    template: "<home></home>"
  }).state('test', { //Test Page
    url: '/test',
    template: "<test></test>"
  }).state('404', {
    url: '/404',
    template: '<strong>Page Not Found (404)</strong>'
  });

  //    $locationProvider.html5Mode({
  //      enabled: true,
  //    });
}]).directive('home', _home2.default);

exports.default = HomeModule;

},{"./home.component":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _navbar = require('./navbar.controller');

var _navbar2 = _interopRequireDefault(_navbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavbarComponent = function NavbarComponent(AppSettings) {
  "ngInject";

  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + 'main.navbar.html',
    controller: _navbar2.default,
    controllerAs: "vm",
    scope: {
      // text: "@" Directive parameters
    },
    bindToController: true
  };
};
NavbarComponent.$inject = ["AppSettings"];

exports.default = NavbarComponent;

},{"./navbar.controller":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarController =
/*@ngInject*/

["$rootScope", "$scope", "AppSettings", "$sce", "LocaleFactory", "EventHelper", function NavbarController($rootScope, $scope, AppSettings, $sce, LocaleFactory, EventHelper) {
  _classCallCheck(this, NavbarController);

  //common features.
  this.name = 'NavbarController';
  this.rootScope = $rootScope;
  this.scope = $scope;
  this.settings = AppSettings;
  this.trustAsHtml = $sce.trustAsHtml;
  this.t = Drupal.t;
  this.EventHelper = EventHelper;
  this.locale = LocaleFactory;

  //Custom code
}];

exports.default = NavbarController;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _navbar = require('./navbar.component');

var _navbar2 = _interopRequireDefault(_navbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavBarModule = angular.module('app.components.navbar', ['ui.router']).directive('navbar', _navbar2.default);

exports.default = NavBarModule;

},{"./navbar.component":7}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _test = require('./test/test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SharedComponentsModule = angular.module('app.shared.components', [_test2.default.name]);

exports.default = SharedComponentsModule;

},{"./test/test":13}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _test = require('./test.controller');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestComponent = function TestComponent(AppSettings) {
  "ngInject";

  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + 'test.html',
    controller: _test2.default,
    controllerAs: "vm",
    scope: {}
  };
};
TestComponent.$inject = ["AppSettings"];

exports.default = TestComponent;

},{"./test.controller":12}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestController =
/*@ngInject*/

["$rootScope", "$scope", "$sce", "AppSettings", "LocaleFactory", "FormatsFactory", function TestController($rootScope, $scope, $sce, AppSettings, LocaleFactory, FormatsFactory) {
  _classCallCheck(this, TestController);

  //common features.
  this.name = 'TestController';
  this.settings = AppSettings;
  this.locale = LocaleFactory;
  this.formats = FormatsFactory;
  this.trustAsHtml = $sce.trustAsHtml;
  this.t = Drupal.t;

  //Custom code.
}];

exports.default = TestController;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _test = require('./test.component');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestModule = angular.module('app.shared.components.test', [
  //Add module dependencies here
  //in the format.
  /*OtherModule.name*/
]).directive('test', _test2.default);

exports.default = TestModule;

},{"./test.component":11}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CapitalizeModule = angular.module('app.shared.filters.capitalize', []).filter('capitalize', function () {
  "ngInject";

  return function (input, all) {
    var reg = all ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
    return !!input ? input.replace(reg, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }) : '';
  };
});

exports.default = CapitalizeModule;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _startFrom = require('./startFrom/startFrom.filter');

var _startFrom2 = _interopRequireDefault(_startFrom);

var _capitalize = require('./capitalize/capitalize.filter');

var _capitalize2 = _interopRequireDefault(_capitalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filters = angular.module('app.shared.filters', [_capitalize2.default.name, _startFrom2.default.name]);

exports.default = Filters;

},{"./capitalize/capitalize.filter":14,"./startFrom/startFrom.filter":16}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var StartFrom = angular.module('app.shared.filters.startfrom', []).filter('startFrom', function () {
  "ngInject";

  return function (input, start) {
    if (input.length) {
      start = +start; //parse to int
      return input.slice(start);
    }
  };
});

exports.default = StartFrom;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appSettings = require('./appSettings.service');

var _appSettings2 = _interopRequireDefault(_appSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppSettings = angular.module('app.shared.services.settings', ['ngLodash']).factory('AppSettings', _appSettings2.default);

exports.default = AppSettings;

},{"./appSettings.service":18}],18:[function(require,module,exports){
"use strict";

AppSettings.$inject = ["$rootScope", "lodash"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * AppSettings.
 * Contains the site settings injected in the common.inc file
 * 
 * @see includes/common.inc 
 * @class      AppSettings (name)
 * @param      {<type>}  $rootScope  The root scope
 * @param      {Array}   lodash      The lodash
 * @return     {<type>}  { description_of_the_return_value }
 */
function AppSettings($rootScope, lodash) {
  "ngInject";

  var settings = Drupal.settings.angmod;
  var _ = lodash;

  Drupal.behaviors.angmod = function (context) {
    settings.name = 'AppSettings';
    settings.lang = settings.lang || {};
    settings.basePath = Drupal.settings.basePath;
    settings.pathPrefix = Drupal.settings.pathPrefix;

    /**
     * Check if the current user is in the Administrator role.
     * @return {boolean}  True if admin, False otherwise.
     */
    settings.isAdmin = function () {
      "use strict";

      return _.includes(settings.user.roles, 'administrator');
    };

    /**
     * Determine if the current user is authenticated.
     * @return {boolean}  True if authenticated, False otherwise.
     */
    settings.isAuthenticated = function () {
      "use strict";

      return parseInt(settings.user.id) > 0;
    };
  }.bind(this)();

  return settings;
}

exports.default = AppSettings;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EventHelper = function EventHelper($rootScope) {
  "use strict";
  "ngInject";

  var loading = false;

  function broadcastGlobalEvent(eventName, data, scope) {
    $rootScope.$broadcast(eventName, data, scope);
  }

  function globalLoadingStart() {
    loading = true;
  }

  function globalLoadingStop() {
    loading = false;
  }

  var methods = {
    broadcastGlobalEvent: broadcastGlobalEvent,
    globalLoadingStart: globalLoadingStart,
    globalLoadingStop: globalLoadingStop,
    loading: loading
  };

  return methods;
};
EventHelper.$inject = ["$rootScope"];

exports.default = EventHelper;

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event = require('./event.factory');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = angular.module('app.shared.services.helper.event', []).factory('EventHelper', _event2.default);

exports.default = _module;

},{"./event.factory":19}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formats = require('./formats.service');

var _formats2 = _interopRequireDefault(_formats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Formats = angular.module('app.shared.services.helper.formats', []).factory('FormatsFactory', _formats2.default);

exports.default = Formats;

},{"./formats.service":22}],22:[function(require,module,exports){
"use strict";

FormatsFactory.$inject = ["AppSettings", "$filter", "LocaleFactory"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
function FormatsFactory(AppSettings, $filter, LocaleFactory) {
  "ngInject";

  var factory = {};
  factory.name = 'Formats';

  var siteUrl = AppSettings.sitePath + AppSettings.basePath + AppSettings.pathPrefix;

  Drupal.behaviors.angmod = function (context) {

    /**
     * return the web site full url
     *
     * @return     {<type>}  { description_of_the_return_value }
     */
    factory.siteUrl = function () {
      "use strict";

      return siteUrl;
    };

    /**
     * Return a plural format based on the count argument
     *
     * @param      {string}  singularString  The singular string
     * @param      {string}  pluralString    The plural string
     * @param      {<type>}  count           The count
     * @return     {<type>}  { formatted string }
     */
    factory.formatPlural = function (singularString, pluralString, count) {
      count = count || 0;
      return Drupal.formatPlural(count, '1 ' + singularString, '@count ' + pluralString);
    };
  }.bind(this)();

  return factory;
}

exports.default = FormatsFactory;

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event = require('./event/event.module');

var _event2 = _interopRequireDefault(_event);

var _locale = require('./locale/locale');

var _locale2 = _interopRequireDefault(_locale);

var _formats = require('./formats/formats');

var _formats2 = _interopRequireDefault(_formats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HelperModule = angular.module('app.shared.services.helper', [_event2.default.name, _locale2.default.name, _formats2.default.name]);

exports.default = HelperModule;

},{"./event/event.module":20,"./formats/formats":21,"./locale/locale":24}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locale = require('./locale.service');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Locale = angular.module('app.shared.services.helper.locale', []).factory('LocaleFactory', _locale2.default);

exports.default = Locale;

},{"./locale.service":25}],25:[function(require,module,exports){
'use strict';

LocaleFactory.$inject = ["$filter", "AppSettings"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
function LocaleFactory($filter, AppSettings) {
  "ngInject";

  var factory = {};
  var settings = AppSettings;

  Drupal.behaviors.angmod = function (context) {
    factory.name = 'Locale';

    //Common Strings

    factory.slogan = Drupal.t('Welcome to @siteName', {
      '@siteName': AppSettings.siteName
    });

    factory.home = Drupal.t('Home');
    factory.accept = Drupal.t('accept');
    factory.cancel = Drupal.t('cancel');
    factory.user = Drupal.t('user');
    factory.login = Drupal.t('login');
    factory.register = Drupal.t('register');
    factory.search = Drupal.t('search');
    factory.moreInfo = Drupal.t('more info');
  }.bind(this)();

  return factory;
}

exports.default = LocaleFactory;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RestFactory = function RestFactory(Restangular, AppSettings) {
  "ngInject";
  "use strict";

  var preBuildQuery = function preBuildQuery(query, style, range, page) {
    query = query || {};

    if (style) {
      query.style = style;
    }

    if (range) {
      query.range = range;
    }

    if (page) {
      query.page = page;
    }

    return query;
  };

  var token = '';

  (function () {
    if (AppSettings.isAuthenticated()) {
      Restangular.one('session/token').get().then(function (res) {
        token = res['X-CSRF-Token'] || res.data['X-CSRF-Token'];
        Restangular.setDefaultHeaders({ "X-CSRF-Token": token });
      });
    }
  })();

  function Rest() {
    this.getToken = function () {
      return token;
    };

    this.nodes = function (query, style, range, page) {
      query = preBuildQuery(query, style, range, page);
      var nodes = Restangular.all('nodes');
      return nodes.getList(query);
    };
  }

  return new Rest();
};
RestFactory.$inject = ["Restangular", "AppSettings"];

exports.default = RestFactory;

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rest = require('./rest.factory');

var _rest2 = _interopRequireDefault(_rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RestModule = angular.module('app.shared.services.rest', ['restangular']).config(['RestangularProvider', function (RestangularProvider) {
  "use strict";
  "ngInject";

  var settings = Drupal.settings.angmod;

  RestangularProvider.setBaseUrl(settings.restPath);
  RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
    var extractedData = [];

    if (operation === "getList") {
      extractedData.data = data.data;
      extractedData.response = response;
      extractedData.meta = data.meta;
      extractedData.count = data.count;
    } else {
      extractedData = data;
    }
    return extractedData;
  });
}]).factory('RestFactory', _rest2.default);

exports.default = RestModule;

},{"./rest.factory":26}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = require('./helper/helper.module');

var _helper2 = _interopRequireDefault(_helper);

var _rest = require('./rest/rest');

var _rest2 = _interopRequireDefault(_rest);

var _appSettings = require('./appSettings/appSettings');

var _appSettings2 = _interopRequireDefault(_appSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import WS from './webSocket/webSocket';

var SharedServices = angular.module('app.shared.services', [_appSettings2.default.name, _rest2.default.name, _helper2.default.name]);

// WS.name
exports.default = SharedServices;

},{"./appSettings/appSettings":17,"./helper/helper.module":23,"./rest/rest":27}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./components/common.components');

var _common2 = _interopRequireDefault(_common);

var _filters = require('./filters/filters');

var _filters2 = _interopRequireDefault(_filters);

var _services = require('./services/services.module');

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SharedComponents = angular.module('app.shared', [_filters2.default.name, _services2.default.name, _common2.default.name]);

exports.default = SharedComponents;

},{"./components/common.components":10,"./filters/filters":15,"./services/services.module":28}]},{},[2])


//# sourceMappingURL=maps/app.main.js.map
