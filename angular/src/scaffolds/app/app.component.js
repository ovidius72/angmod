let AppComponent = function(AppSettings) {
  "ngInject";
  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + 'app.<%= lowerCaseName %>.html',
  }
};

export default AppComponent;
