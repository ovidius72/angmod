import LocaleFactory from './locale.service';

let Locale = angular.module('app.shared.services.helper.locale',
  [])
  .factory('LocaleFactory', LocaleFactory);

export default Locale;
