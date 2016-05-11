import NavBar from './navbar/navbar';
import Home from './home/home';

let AppComponents = angular.module('app.components', [
  NavBar.name,
  Home.name
]);

export default AppComponents;
