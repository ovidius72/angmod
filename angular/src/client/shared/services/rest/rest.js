import RestFactory from './rest.factory';

let RestModule = angular.module('app.shared.services.rest',
  ['restangular'])
  .config(['RestangularProvider', function (RestangularProvider) {
    "use strict";
    "ngInject";

    var settings = Drupal.settings.angmod;

    RestangularProvider.setBaseUrl(settings.restPath);
    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
      var extractedData = [];

      if (operation === "getList") {
        extractedData.data = data.data;
        extractedData.response = response;
        extractedData.meta = data.meta;
        extractedData.count = data.count;

      }
      else {
        extractedData = data;
      }
      return extractedData;
    });

  }])
  .factory('RestFactory', RestFactory);

export default RestModule;
