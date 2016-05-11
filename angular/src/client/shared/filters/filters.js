import StartFrom from './startFrom/startFrom.filter';
import Capitalize from './capitalize/capitalize.filter';

let Filters = angular.module('app.shared.filters', [
  Capitalize.name,
  StartFrom.name
]);

export default Filters;
