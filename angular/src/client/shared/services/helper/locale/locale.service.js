function LocaleFactory($filter, AppSettings) {
  "ngInject";
  let factory = {};
  let settings = AppSettings;

  Drupal.behaviors.angmod = (function (context) {
    factory.name = 'Locale';

    //Common Strings
    
    factory.slogan = Drupal.t('Welcome to @siteName', {
      '@siteName': AppSettings.siteName
    });

    factory.home = Drupal.t('Home');
    factory.accept = Drupal.t('accept');
    factory.cancel = Drupal.t('cancel');
    factory.user = Drupal.t('user');
    factory.login = Drupal.t('login');
    factory.register = Drupal.t('register');
    factory.search = Drupal.t('search');
    factory.moreInfo = Drupal.t('more info');
   
  }.bind(this))();

  return factory;
}

export default LocaleFactory;
