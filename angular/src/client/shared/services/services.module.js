import Helper from './helper/helper.module';
import Rest from './rest/rest';
import AppSettings from './appSettings/appSettings';
// import WS from './webSocket/webSocket';

let SharedServices = angular.module('app.shared.services', [
  AppSettings.name,
  Rest.name,
  Helper.name,
  // WS.name
]);

export default SharedServices;
