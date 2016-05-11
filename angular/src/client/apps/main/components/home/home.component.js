import HomeController from './home.controller';

let HomeComponent = (AppSettings) => {
  "ngInject";

  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + 'auctions.home.html',
    controller: HomeController,
    controllerAs: "vm",
    scope: {}
  }

};

export default HomeComponent;
