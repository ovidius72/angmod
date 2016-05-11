import Event from './event.factory';

let module = angular.module('app.shared.services.helper.event', [])
  .factory('EventHelper', Event);

export default module;
