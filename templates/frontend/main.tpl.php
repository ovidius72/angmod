<?php

/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 */

global $language;

$language->prefix ? $langPrefix = '/' . $language->prefix . '/' : $langPrefix = '/';
$path = drupal_is_front_page() ? $langPrefix : $langPrefix . current_path() . '/';
drupal_set_title('');

?>
<!-- Uncomment if we have enabled HTML5 mode -->
<!--<base href="--><?php //print $path; ?><!--">-->
<div class="angular-app" ng-app="app.main" ng-strict-di id="main-wrapper">
  <div class="angular-container">
    <app>
      <div class="app-loader container">Loading...</div>
    </app>
  </div>
</div>
