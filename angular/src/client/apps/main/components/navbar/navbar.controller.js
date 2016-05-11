class NavbarController {
  /*@ngInject*/

  constructor($rootScope,
              $scope,
              AppSettings,
              $sce,
              LocaleFactory,
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

    //Custom code
    
  }
}

export default NavbarController;
