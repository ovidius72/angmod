import TestComponent from './test.component';

let TestModule = angular.module('app.shared.components.test', [
  //Add module dependencies here
  //in the format.
  /*OtherModule.name*/
])
  .directive('test', TestComponent);

export default TestModule;
