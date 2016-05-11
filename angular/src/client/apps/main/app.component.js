let AppComponent = (AppSettings) => {
  "ngInject";
  return {
    restrict: 'E',
    templateUrl: AppSettings.templates + 'app.main.html',
  };
};

export default AppComponent;
