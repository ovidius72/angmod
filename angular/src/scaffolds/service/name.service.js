function <%= Name %>Factory(AppSettings, LocaleFactory, FormatsFactory) {
  "ngInject";
  let factory = {};
  let settings = AppSettings;
  let locale = LocaleFactory;
  let formats = FormatsFactory;

  Drupal.behaviors.angmod = (function (context) {
    factory.name = '<%= Name %>';



  }.bind(this))();

  return this.factory;
}

export default <%= Name %>Factory;
