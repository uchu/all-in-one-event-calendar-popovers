<?php

/**
 * The class which adds Popovers javascript.
 *
 * @author     Time.ly Network Inc.
 * @since      1.0
 *
 * @package    AI1ECP
 * @subpackage AI1ECP.Lib
 */
class Ai1ecsas_Javascript_Popovers extends Ai1ec_Base {

	/**
	 * Adds Popovers javascript
	 *
	 * @param array  $files
	 * @param string $page_to_load
	 *
	 * @return array
	 */
	public function add_js( array $files, $page_to_load ) {
		$script_path = AI1ECP_PATH . DIRECTORY_SEPARATOR . 'public' .
				DIRECTORY_SEPARATOR . 'js' . DIRECTORY_SEPARATOR . 'scripts' .
				DIRECTORY_SEPARATOR;
		$script      = $script_path . 'popovers.js';
		switch ( $page_to_load ) {
			case 'ai1ec_widget.js':
				$script = array(
					'url' => AI1ECP_URL . '/public/js/scripts/popovers.js',
					'id'  => 'popovers'
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
