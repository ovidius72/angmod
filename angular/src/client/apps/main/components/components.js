import NavBar from './navbar/navbar';
import Home from './home/home';

let AppComponents = angular.module('app.components', [
  Home.name,
  NavBar.name
]);

export default AppComponents;
