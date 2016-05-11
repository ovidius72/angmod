import NavbarController from './navbar.controller';

let NavbarComponent = (AppSettings) => {
  "ngInject";

  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + '<%= lowerCaseName %>.navbar.html',
    controller: NavbarController,
    controllerAs: "vm",
    scope: {},
    bindToController: true
  }
};

export default NavbarComponent;
