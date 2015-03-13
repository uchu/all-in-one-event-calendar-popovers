<?php

/**
 * Save and Share add-on front controller.
 *
 * @author     Time.ly Network Inc.
 * @since      2.2
 *
 * @package    AI1ECSAS
 * @subpackage AI1ECSAS.Controller
 */
class Ai1ec_Controller_Ai1ecsas extends Ai1ec_Base_License_Controller {

	/**
	 * @see Ai1ec_Base_Extension_Controller::minimum_core_required()
	 */
	public function minimum_core_required() {
		return '2.2.0';
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Base_Extension_Controller::get_name()
	*/
	public function get_name() {
		return 'Save and Share';
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Base_Extension_Controller::get_machine_name()
	*/
	public function get_machine_name() {
		return 'save_and_share';
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Base_Extension_Controller::get_version()
	*/
	public function get_version() {
		return AI1ECSAS_VERSION;
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Licence_Controller::get_file()
	*/
	public function get_file() {
		return AI1ECSAS_FILE;
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Base_License_Controller::get_license_label()
	*/
	public function get_license_label() {
		return 'Save and Share License Key';
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Base_License_Controller::add_tabs()
	*/
	public function add_tabs( array $tabs ) {
		$tabs = parent::add_tabs( $tabs );
		$tabs['extensions']['items']['save_and_share'] = __(
			'Save and Share',
			AI1ECSAS_PLUGIN_NAME
		);
		return $tabs;
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
			array( 'javascript.save-and-share', 'add_js' ),
			10,
			2
		);
/*
		$dispatcher->register_filter(
			'ai1ec_below_toolbar',
			array( 'view.bf-frontend', 'get_html_for_big_filtering' ),
			10,
			3
		);
		// Add new LESS file to parse queue.
		$dispatcher->register_filter(
			'ai1ec_less_files',
			array( 'less.big-filtering', 'add_less_files' ),
			10,
			2
		);

		$dispatcher->register_filter(
			'ai1ec_theme_args_filter-menu.twig',
			array( 'view.bf-frontend', 'filter_menu_args' )
		);
*/
	}

	public function on_deactivation() {
		parent::on_deactivation();
	}

	public function on_activation( Ai1ec_Registry $ai1ec_registry ) {}

}
