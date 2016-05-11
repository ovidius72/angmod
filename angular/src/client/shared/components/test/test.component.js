import TestController from './test.controller';

let TestComponent = (AppSettings) => {
  "ngInject";

  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + 'test.html',
    controller: TestController,
    controllerAs: "vm",
    scope: {}
  }

};

export default TestComponent;
