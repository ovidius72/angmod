<?php

/**
 * DO NOT REMOVE THE //@newThemeFunction placeholder.
 * This is used for autogenerated theme functions.
 */

/**
 * Implements hook_theme().
 */
function angmod_theme($existing, $type, $theme, $path) {
  return array(
    'main' => array(
      'variables' => array(
        'product' => FALSE,
      ),
      'template' => 'main',
      'path' => $path . '/templates/frontend'
    ),
    //@newThemeFunction//
  );
}