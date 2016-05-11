class <%= Name %>Controller {
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
      this.name = '<%= Name %>Controller';
      this.settings = AppSettings;
      this.locale = LocaleFactory;
      this.formats = FormatsFactory;
      this.trustAsHtml = $sce.trustAsHtml;
      this.t = Drupal.t;

      //Custom code.

  }
}

export default <%= Name %>Controller;
