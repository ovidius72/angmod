import HomeComponent from './home.component';

let HomeModule = angular.module('app.components.home', [
    'ui.router'
    //Add module dependencies here
    //in the format.
    /*OtherModule.name*/
  ])
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    "ngInject";

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', { // Home  page
        url: '/',
        template: "<home></home>",
      })
      .state('_test', { // Test page. Please remove.
        url: '/test',
        template: "Test Page",
      });

    //Enable to set Html5Mode. Uncomment the base tag from the drupal template to get it working.
//    $locationProvider.html5Mode({
//      enabled: true,
//    });

  })
  .run(function ($rootScope, $state) {
    "ngInject";

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.stateIsLoading = true;
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.stateIsLoading = false;
    });
  })
  .directive('home', HomeComponent);

export default HomeModule;
