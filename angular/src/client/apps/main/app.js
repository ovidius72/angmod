import AppComponent from './app.component.js';
import Components from './components/components';
import SharedComponents from './../../shared/shared.module';

angular.module('app.main', [
    'ui.router',
    'ngAnimate',
    'ngSanitize',
    'ngMaterial',
    SharedComponents.name,
    Components.name
  ])
  .directive('app', AppComponent)
  .config(function ($httpProvider, $mdIconProvider, $mdThemingProvider) {
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

    $mdThemingProvider.theme('default')
      .primaryPalette('MyPalette');
//      .accentPalette('MyAccentPalette');
  })
  .run(['$rootScope', '$state', function ($rootScope, $state, $stateParams) {
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
