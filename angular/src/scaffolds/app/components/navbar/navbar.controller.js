class NavbarController {
  /*@ngInject*/

  constructor ($rootScope, $scope, AppSettings, $sce) {
    //common features.
    this.settings = AppSettings;
    this.translations = {};
    this.generateTranslations();
    this.trustAsHtml = $sce.trustAsHtml;
    this.t = Drupal.t;

    this.name = 'NavbarController';
    this.siteSlogan = this.translations.slogan;
  }

  /**
   * Generate translatebale strings.
   */
  generateTranslations() {
    let that = this;
    Drupal.behaviors.angmod = (function (context) {
      //Translations go here.
      that.translations.login = Drupal.t('Login');
      that.translations.welcome = Drupal.t('Welcome to @siteName', {
        '@siteName': that.settings.siteName
      })
    })();
  }
}

export default NavbarController;
