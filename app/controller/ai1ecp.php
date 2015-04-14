<?php

/**
 * Popovers add-on front controller.
 *
 * @author     Time.ly Network Inc.
 * @since      1.0
 *
 * @package    AI1ECP
 * @subpackage AI1ECP.Controller
 */
class Ai1ec_Controller_Ai1ecp extends Ai1ec_Base_License_Controller {

	/**
	 * @see Ai1ec_Base_Extension_Controller::minimum_core_required()
	 */
	public function minimum_core_required() {
		return '2.2.1';
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Base_Extension_Controller::get_name()
	*/
	public function get_name() {
		return 'Popovers';
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Base_Extension_Controller::get_machine_name()
	*/
	public function get_machine_name() {
		return 'popovers';
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Base_Extension_Controller::get_version()
	*/
	public function get_version() {
		return AI1ECP_VERSION;
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Licence_Controller::get_file()
	*/
	public function get_file() {
		return AI1ECP_FILE;
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Base_License_Controller::get_license_label()
	*/
	public function get_license_label() {
		return 'Popovers License Key';
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Base_License_Controller::add_tabs()
	*/
	public function add_tabs( array $tabs ) {
		$tabs = parent::add_tabs( $tabs );
		$tabs['extensions']['items']['popovers'] = __(
			'Popovers',
			AI1ECP_PLUGIN_NAME
		);
		return $tabs;
	}

	/**
	 * Empty function body.
	 *
	 * @return void Method does not return.
	 */
	public function on_activation() {

	}

	/**
	 * Register custom settings used by the extension to ai1ec general settings
	 * framework
	 *
	 * @return void
	 */
	protected function _get_settings() {
		return array(
		);
	}

	/**
	 * Register actions handlers
	 *
	 * @return void
	 */
	protected function _register_actions( Ai1ec_Event_Dispatcher $dispatcher ) {
		// Add JS file.
		$dispatcher->register_filter(
			'ai1ec_render_js',
			array( 'javascript.popovers', 'add_js' ),
			10,
			2
		);
		// Add new LESS file to parse queue.
		$dispatcher->register_filter(
			'ai1ec_less_files',
			array( 'less.popovers', 'add_less_files' ),
			10,
			2
		);
	}
}
