import SettingsService from './appSettings.service';

let AppSettings = angular.module('app.shared.services.settings',
  ['ngLodash'])
  .factory('AppSettings', SettingsService);

export default AppSettings;
