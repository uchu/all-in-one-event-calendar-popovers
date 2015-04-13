<?php

/**
 * View representing a frontend for Popovers.
 *
 * @author       Time.ly Network, Inc.
 * @since        1.0
 * @package      AI1ECP
 * @subpackage   AI1ECP.View
 */
class Ai1ecp_Frontend extends Ai1ec_Base {

	/**
	 * Add popover.
	 *
	 * @return string HTML.
	 */
	public function add_popover( $buttons ) {
		$loader   = $this->_registry->get( 'theme.loader' );
		$file     = $loader->get_file(
			'popover.twig',
			array(
				'text_save'  => __( 'Save', AI1ECP_PLUGIN_NAME ),
			),
			false
		);
		$buttons .= $file->get_content();
		return $buttons;
	}
}
