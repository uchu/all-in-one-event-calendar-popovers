<?php

/**
 * The class which adds LESS code for Save and Share.
 *
 * @author     Time.ly Network Inc.
 * @since      1.0
 *
 * @package    AI1ECSAS
 * @subpackage AI1ECSAS.Lib
 */
class Ai1ec_Less_Save_And_Share extends Ai1ec_Base {

	/**
	 * Add LESS files to parse.
	 *
	 * @param array  $files
	 *
	 * @return array
	 */
	public function add_less_files( array $files ) {
		$files[] = 'sas.less';
		return $files;
	}
}
