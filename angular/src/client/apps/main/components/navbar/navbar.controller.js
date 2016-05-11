class NavbarController {
  /*@ngInject*/

  constructor($rootScope,
              $scope,
              AppSettings,
              $sce,
              LocaleFactory,
              $cookies,
              EventHelper) {
    //common features.
    this.name = 'NavbarController';
    this.rootScope = $rootScope;
    this.scope = $scope;
    this.settings = AppSettings;
    this.trustAsHtml = $sce.trustAsHtml;
    this.t = Drupal.t;
    this.EventHelper = EventHelper;
    this.locale = LocaleFactory;
    this.$cookies = $cookies;

    //Custom code
    
  }
}

export default NavbarController;
