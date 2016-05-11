let RestFactory = (Restangular, AppSettings) => {
  "ngInject";
  "use strict";
 
  var preBuildQuery = (query, style, range, page) => {
    query = query || {};
    
    if (style) {
      query.style = style;
    }

    if (range) {
      query.range = range;
    }

    if (page) {
      query.page = page;
    }

    return query;
  };

  var token = '';

  (() => {
    if (AppSettings.isAuthenticated()) {
      Restangular.one('session/token').get().then(
        (res) => {
          token = res['X-CSRF-Token'] || res.data['X-CSRF-Token'];
          Restangular.setDefaultHeaders({"X-CSRF-Token": token});
        }
      );
    }
  })();

  function Rest() {
    this.getToken = () => {
      return token;
    };

    this.nodes = function (query, style, range, page) {
      query = preBuildQuery(query, style, range, page);
      var nodes = Restangular.all('nodes');
      return nodes.getList(query);
    };

  }


  return new Rest();
};

export default RestFactory;
