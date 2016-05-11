class TestController {
  /*@ngInject*/

  constructor (
    $rootScope,
    $scope,
    $sce,
    AppSettings,
    LocaleFactory,
    FormatsFactory
    ) {

      //common features.
      this.name = 'TestController';
      this.settings = AppSettings;
      this.locale = LocaleFactory;
      this.formats = FormatsFactory;
      this.trustAsHtml = $sce.trustAsHtml;
      this.t = Drupal.t;

      //Custom code.

  }
}

export default TestController;
