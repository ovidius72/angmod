<?php

/**
 * Add administration pages to the backend.
 * 
 * @param $form
 * @param $form_state
 */
function angmod_custom_settings_administration_form($form, &$form_state) {
  $form = array();
  $form['test'] = array(
  	'#type' => 'markup',
  	'#markup' => t('Angom admin page'),
  	);
  
  return system_settings_form($form);
}
