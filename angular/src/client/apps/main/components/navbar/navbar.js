import NavbarComponent from './navbar.component';

let NavBarModule = angular.module('app.components.navbar', [
  'ui.router',
  'ngCookies',
])
  .directive('navbar', NavbarComponent);

export default NavBarModule;
