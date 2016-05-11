import NavbarController from './navbar.controller';

let NavbarComponent = (AppSettings) => {
  "ngInject";

  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + 'main.navbar.html',
    controller: NavbarController,
    controllerAs: "vm",
    scope: {
      // text: "@" Directive parameters
    },
    bindToController: true
  };

};

export default NavbarComponent;
