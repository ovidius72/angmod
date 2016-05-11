import NavbarComponent from './navbar.component';

let NavBarModule = angular.module('app.components.navbar', [
  'ui.router',
])
  .directive('navbar', NavbarComponent);

export default NavBarModule;
