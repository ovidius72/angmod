<?php

global $language;
$langPrefix = '/';
$isFront = drupal_is_front_page();
if ($language->prefix) {
  $langPrefix = '/' . $language->prefix . '/';
}
$path = drupal_is_front_page() ? $langPrefix : $langPrefix . current_path() . '/';

//Uncomment the function below to remove the page title.
/*drupal_set_title('');*/
?>
<h1>Welcome to <%= Name %></h1>
<!--<base href="--><?php //print $path; ?><!--">-->
<div class="angular-app" ng-app="app.<%= lowerCaseName %>" ng-strict-di ng-cloak>
  <app>Loading...</app>
</div>
