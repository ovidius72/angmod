import CommonComponents from './components/common.components';
import Filters from './filters/filters';
import SharedServices from './services/services.module';

let SharedComponents = angular.module('app.shared', [
  Filters.name,
  SharedServices.name,
  CommonComponents.name
]);

export default SharedComponents;
