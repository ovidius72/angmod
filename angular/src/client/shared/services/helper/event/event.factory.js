let EventHelper = ($rootScope) => {
  "use strict";
  "ngInject";

  var loading = false;


  function broadcastGlobalEvent(eventName, data, scope) {
    $rootScope.$broadcast(eventName, data, scope);
  }

  function globalLoadingStart() {
    loading = true;
  }

  function globalLoadingStop() {
    loading = false;
  }

  var methods = {
    broadcastGlobalEvent: broadcastGlobalEvent,
    globalLoadingStart: globalLoadingStart,
    globalLoadingStop: globalLoadingStop,
    loading: loading,
  };

  return methods;

}

export default EventHelper;

