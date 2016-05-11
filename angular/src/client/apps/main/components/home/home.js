import HomeComponent from './home.component';

let HomeModule = angular.module('app.components.home', [])
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    "ngInject";

    $urlRouterProvider.otherwise('/');
    // $urlRouterProvider.otherwise('404');

    $stateProvider
      .state('home', { //App Home Page
        url: '/',
        template: "<home></home>",
      })
      .state('test', { //Test Page
        url: '/test',
        template: "<test></test>",
      })
      .state('404', {
        url: '/404',
        template: '<strong>Page Not Found (404)</strong>'
      });

//    $locationProvider.html5Mode({
//      enabled: true,
//    });

  })
  .directive('home', HomeComponent);

export default HomeModule;
