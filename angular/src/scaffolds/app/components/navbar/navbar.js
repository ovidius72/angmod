import NavbarComponent from './navbar.component';

let NavBarModule = angular.module('app.components.navbar', [
  'ui.router'
  //Add module dependencies here
  //in the format.
  /*OtherModule.name*/
])
  .directive('navbar', NavbarComponent);

export default NavBarModule;
