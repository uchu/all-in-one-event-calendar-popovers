<?php

/**
 * The class which adds Save and Share javascript.
 *
 * @author     Time.ly Network Inc.
 * @since      2.2.0
 *
 * @package    AI1ECSAS
 * @subpackage AI1ECSAS.Lib
 */
class Ai1ecsas_Javascript_Save_And_Share extends Ai1ec_Base {

	/**
	 * Adds Save and Share javascript
	 *
	 * @param array  $files
	 * @param string $page_to_load
	 *
	 * @return array
	 */
	public function add_js( array $files, $page_to_load ) {
		if ( Ai1ec_Javascript_Controller::CALENDAR_PAGE_JS === $page_to_load ) {
			$files[] = AI1ECSAS_PATH . '/public/js/pages/save_and_share.js';
		}
		if ( 'main_widget.js' === $page_to_load ) {
			$files[] = array(
				'url' => AI1ECSAS_URL . '/public/js/pages/save_and_share.js',
				'id'  => 'save_and_share'
			);
		}
		return $files;
	}
}
