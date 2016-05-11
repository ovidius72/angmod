<?php

/**
 * @param $application
 *        The Angular.js application name as in the folder structure.
 */
function angular_include_scripts($application) {
  global $user,
         $language,
         $base_url;


  //Server Timezone
  $timezone = date_default_timezone_get();

  //Common paths
  $path = drupal_get_path('module', 'angmod');
  $angularPath = $path . '/angular';
  $distPath = $angularPath . '/dist';
  $src_path = $path . '/angular/src';
  $bower_path = $src_path . '/bower_components';
  $langPrefix = $language->prefix;
  if ($langPrefix) {
    $langPrefix = '/' . $langPrefix;
  }

  //CSS
  drupal_add_css($bower_path . '/angular-material/angular-material.min.css');
  drupal_add_css($distPath . '/css/custom_style.css', array(
    'weight' => 0,
    'type' => 'file'
  ));


  //SCRIPTS
  $js_settings = array(
    'modulePath' => $path,
    'appsPath' => $src_path . '/client/apps/' . $application,
    'templates' => $base_url . '/' . $distPath . '/templates/',
    'sitePath' => $base_url,
    'apiPath' => $base_url . $langPrefix . '/api',
    'restPath' => $base_url . $langPrefix . '/rest',
    'currentPath' => current_path(),
    'pathArgument0' => arg(0),
    'pathArgument1' => arg(1),
    'requestUri' => request_uri(),
    'requestPath' => request_path(),
    'srcPath' => $src_path,
    'siteName' => variable_get('site_name', ''),
    'language' => $language,
  
    //Inject the variables you need in the front-end.
    /*variables' => array(
      'variable' => variable_get('variable_name', 'default_value'),
    ),*/

    //User information you need
    'user' => array(
      'user' => isset($user->name) ? $user->name : 'anonymous',
      // 'id' => $user->uid,
      // 'roles' => $user->roles,
    ),

    //The default site timezone
    'timezone' => $timezone,
  );

  /**
   * Application Settings
   */
  drupal_add_js(array('angmod' => $js_settings), 'setting');

  /**
   * AngularJS
   */
  drupal_add_js($bower_path . '/angular/angular.js', array(
    'type' => 'file',
    'weight' => 0
  ));

  /**
   * Strings passed to the Drupal.t() function.
   */
  drupal_add_js($distPath . '/js/language.drupal.js', array(
    'type' => 'file',
    'weight' => 10
  ));

  /**
   * Angular Cookies
   */
  drupal_add_js($bower_path . '/angular-cookies/angular-cookies.min.js', array(
    'type' => 'file',
    'weight' => 20
  ));

  /**
   * Angular lodash
   */ 
  drupal_add_js($bower_path . '/ng-lodash/build/ng-lodash.min.js', array(
    'type' => 'file',
    'weight' => 30
  ));

  /**
   * Restangular
   */
  drupal_add_js($bower_path . '/restangular/dist/restangular.min.js', array(
    'type' => 'file',
    'weight' => 40
  ));

  /**
   * Angular Sanitize
   */
  drupal_add_js($bower_path . '/angular-sanitize/angular-sanitize.min.js', array(
    'type' => 'file',
    'weight' => 60
  ));

  /**
   * Angular ui-router
   */
  drupal_add_js($bower_path . '/angular-ui-router/release/angular-ui-router.min.js', array(
    'type' => 'file',
    'weight' => 70
  ));

  /**
   * Angular Aria
   */
  drupal_add_js($bower_path . '/angular-aria/angular-aria.min.js', array(
    'type' => 'file',
    'weight' => 90
  ));

  /**
   * Angular Animate
   */
  drupal_add_js($bower_path . '/angular-animate/angular-animate.min.js', array(
    'type' => 'file',
    'weight' => 100
  ));

  /**
   * Angular Material
   */
  drupal_add_js($bower_path . '/angular-material/angular-material.min.js', array(
    'type' => 'file',
    'weight' => 110
  ));

  /**
   * Angular Material Icons
   */
  
  drupal_add_js($bower_path . '/angular-material-icons/angular-material-icons.min.js', array(
    'type' => 'file',
    'weight' => 120
  ));

  /**
   * Angular Locale.
   * @param language: based on the current site language.
   */
  $locale_file = $bower_path . '/angular-i18n/angular-locale_' . $language->language . '.js';
  drupal_add_js($locale_file, array(
    'type' => 'file',
    'weight' => 130
  ));

  /**
   * Add EQ.js for element queries
   */
  drupal_add_js($bower_path . '/eq.js/dist/eq.min.js', array(
    'type' => 'file',
    'weight' => 140
  ));

  /**
   * Our Application
   * The current loaded application.
   */
  drupal_add_js($distPath . '/js/app.' . $application . '.js', array(
    'type' => 'file',
    'weight' => 200
  ));

  /**
   * Any extra code we need can be added to the extra.js file
   */
  drupal_add_js($distPath . '/js/extras.js', array(
    'type' => 'file',
    'weight' => 300
  ));



}
