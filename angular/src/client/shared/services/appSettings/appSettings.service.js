/**
 * AppSettings.
 * Contains the site settings injected in the common.inc file
 * 
 * @see includes/common.inc 
 * @class      AppSettings (name)
 * @param      {<type>}  $rootScope  The root scope
 * @param      {Array}   lodash      The lodash
 * @return     {<type>}  { description_of_the_return_value }
 */
function AppSettings($rootScope, lodash) {
  "ngInject";

  let settings = Drupal.settings.angmod;
  let _ = lodash;

  Drupal.behaviors.angmod = (function (context) {
    settings.name = 'AppSettings';
    settings.lang = settings.lang || {};
    settings.basePath = Drupal.settings.basePath;
    settings.pathPrefix = Drupal.settings.pathPrefix;

  
    /**
     * Check if the current user is in the Administrator role.
     * @return {boolean}  True if admin, False otherwise.
     */ 
    settings.isAdmin = () => {
      "use strict";
      return _.includes(settings.user.roles, 'administrator');
    };

    /**
     * Determine if the current user is authenticated.
     * @return {boolean}  True if authenticated, False otherwise.
     */
    settings.isAuthenticated = () => {
      "use strict";
      return parseInt(settings.user.id) > 0;
    };


  }.bind(this))();

  return settings;
}

export default AppSettings;
