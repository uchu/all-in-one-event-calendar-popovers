<?php

/**
 * The class which adds LESS code for Popovers.
 *
 * @author     Time.ly Network Inc.
 * @since      1.0
 *
 * @package    AI1ECP
 * @subpackage AI1ECP.Lib
 */
class Ai1ec_Less_Popovers extends Ai1ec_Base {

	/**
	 * Add LESS files to parse.
	 *
	 * @param array  $files
	 *
	 * @return array
	 */
	public function add_less_files( array $files ) {
		$files[] = 'popovers.less';
		return $files;
	}
}
