import <%= Name %>Controller from './<%= camelCaseName %>.controller';

let <%= Name %>Component = (AppSettings) => {
  "ngInject";

  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + '<%= camelCaseName %>.html',
    controller: <%= Name %>Controller,
    controllerAs: "vm",
    scope: {}
  }

};

export default <%= Name %>Component;
