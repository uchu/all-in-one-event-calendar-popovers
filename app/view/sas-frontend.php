<?php

/**
 * View representing a frontend for Save and Share.
 *
 * @author       Time.ly Network, Inc.
 * @since        2.2.0
 * @package      Ai1ECSAS
 * @subpackage   Ai1ECSAS.View
 */
class Ai1ecsas_Frontend extends Ai1ec_Base {

	/**
	 * Add Save and Share buttons to the views.
	 *
	 * @return string HTML.
	 */
	public function add_buttons( $buttons ) {
		$loader = $this->_registry->get( 'theme.loader' );
		$file = $loader->get_file( 'buttons.twig', array(), false );
		$buttons .= $file->get_content();
		return $buttons;
	}

	/**
	 * Add Save and Share buttons to the filter toolbar.
	 *
	 * @return string HTML for toolbar.
	 */
	public function add_toolbar_buttons( $buttons ) {
		$loader = $this->_registry->get( 'theme.loader' );
		$file = $loader->get_file( 'toolbar-buttons.twig', array(), false );
		$buttons .= $file->get_content();
		return $buttons;
	}

	/**
	 * Add Save and Share buttons to the filter toolbar.
	 *
	 * @return string HTML for toolbar.
	 */
	public function add_clear_buttons( $buttons ) {
		$loader = $this->_registry->get( 'theme.loader' );
		$file = $loader->get_file( 'clear-buttons.twig', array(), false );
		$buttons .= $file->get_content();


		$loader = $this->_registry->get( 'theme.loader' );
		$file = $loader->get_file( 'share-modal.twig', array(), false );
		$buttons .= $file->get_content();
		return $buttons;
	}

	/**
	 * Add title panel for shared events.
	 *
	 * @return string HTML for a panel with custom heading.
	 */
	public function add_shared_events_title( $html ) {
		$loader = $this->_registry->get( 'theme.loader' );
		$file = $loader->get_file( 'shared-title.twig', array(), false );
		$html .= $file->get_content();
		return $html;
	}
}
