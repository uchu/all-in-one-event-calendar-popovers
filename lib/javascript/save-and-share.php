<?php

/**
 * The class which adds Save and Share javascript.
 *
 * @author     Time.ly Network Inc.
 * @since      1.0
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
		$script_path = AI1ECSAS_PATH . DIRECTORY_SEPARATOR . 'public' .
				DIRECTORY_SEPARATOR . 'js' . DIRECTORY_SEPARATOR . 'scripts' .
				DIRECTORY_SEPARATOR;
		$script      = $script_path . 'save_and_share.js';
		switch ( $page_to_load ) {
			case 'ai1ec_widget.js':
				$script = array(
					'url' => AI1ECSAS_URL . '/public/js/scripts/save_and_share.js',
					'id'  => 'save_and_share'
				);
				break;
			case 'main_widget.js':
				$script = null;
				break;
		}
		if ( ! empty( $script ) ) {
			$files[] = $script;
		}
		return $files;
	}
}
