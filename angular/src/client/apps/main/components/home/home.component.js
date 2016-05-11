import HomeController from './home.controller';

let HomeComponent = (AppSettings) => {
  "ngInject";

  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + 'main.home.html',
    controller: HomeController,
    controllerAs: "vm",
    scope: {}
  };

};

export default HomeComponent;
