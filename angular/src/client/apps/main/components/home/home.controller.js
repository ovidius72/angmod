class HomeController {
  /*@ngInject*/

  constructor ($rootScope, $scope, AppSettings, $sce, LocaleFactory) {
    //common features.
    this.settings = AppSettings;
    this.trustAsHtml = $sce.trustAsHtml;
    this.t = Drupal.t;
    this.locale = LocaleFactory;
    this.name = 'HomeController';
  }

}

export default HomeController;
