import FormatsFactory from './formats.service';

let Formats = angular.module('app.shared.services.helper.formats',
  [])
  .factory('FormatsFactory', FormatsFactory);

export default Formats;
