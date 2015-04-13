<?php

/**
 * Save and Share add-on front controller.
 *
 * @author     Time.ly Network Inc.
 * @since      1.0
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
	 * Extra arguments for viewing saved events.
	 *
	 * @param object $query
	 *
	 * @return void Method does not return.
	 */
	public function add_extra_arguments( Ai1ec_Abstract_Query $query ) {
		// For making external links on a set of events.
		// The value is a name of the set.
		$query->add_rule( 'saved_events', false, 'string' );
		// Used to indicate if user is viewing his Saved Events.
		$query->add_rule( 'my_saved_events', false, 'string' );
	}

	/**
	 * Handler for ai1ec_view_args_for_view filter.
	 *
	 * @param array $args Input value.
	 *
	 * @return array Modified values.
	 */
	public function ai1ec_view_args_for_view( $args ) {
		$args[] = 'saved_events';
		$args[] = 'my_saved_events';
		return $args;
	}


	/**
	 * Handler for ai1ec_view_args_array filter.
	 *
	 * @param array $args Input values.
	 *
	 * @return array Modified values.
	 */
	public function ai1ec_view_args_array( $args ) {
		if ( is_array( $args ) ) {
			$extra_used_parameters = array(
				'saved_events',
				'my_saved_events'
			);
			$args['_extra_used_parameters'] = $extra_used_parameters;
		}
		return $args;
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
			array( 'javascript.save-and-share', 'add_js' ),
			10,
			2
		);
		// Add new LESS file to parse queue.
		$dispatcher->register_filter(
			'ai1ec_less_files',
			array( 'less.save-and-share', 'add_less_files' ),
			10,
			2
		);
		// Add Save and Share buttons
		$dispatcher->register_filter(
			'ai1ec_action_buttons',
			array( 'view.sas-frontend', 'add_buttons' ),
			10
		);
		// Add buttons to filter toolbar
		$dispatcher->register_filter(
			'ai1ec_additional_buttons',
			array( 'view.sas-frontend', 'add_toolbar_buttons' ),
			10,
			2
		);
		// Append clear buttons to the bottom of views.
		$dispatcher->register_filter(
			'ai1ec_after_view',
			array( 'view.sas-frontend', 'add_clear_buttons' ),
			10
		);
		// Append Share modal.
		$dispatcher->register_filter(
			'ai1ec_after_view',
			array( 'view.sas-frontend', 'add_share_modal' ),
			10
		);
		// Add title for custom calendar.
		$dispatcher->register_filter(
			'ai1ec_above_calendar',
			array( 'view.sas-frontend', 'add_shared_events_title' ),
			10
		);
		// Show unique events when viewing Saved events.
		$dispatcher->register_filter(
			'ai1ec_show_unique_events',
			array( 'view.sas-frontend', 'show_unique_events' ),
			10,
			0
		);
		// Show unique events when viewing Saved events.
		$dispatcher->register_filter(
			'ai1ec_rendering_single_event_actions',
			array( 'view.sas-frontend', 'add_buttons_for_event_details' ),
			10
		);
		// Increase events limit for viewing Saved events.
		$dispatcher->register_filter(
			'ai1ec_events_limit',
			array( 'view.sas-frontend', 'set_event_limit' ),
			10
		);
		// Add support for extra attributes.
		$dispatcher->register_action( 'ai1ec_request_parser_rules_added',
			array( 'controller.ai1ecsas', 'add_extra_arguments' )
		);
		$dispatcher->register_filter(
			'ai1ec_view_args_for_view',
			array( 'controller.ai1ecsas', 'ai1ec_view_args_for_view' )
		);
		$dispatcher->register_filter(
			'ai1ec_view_args_array',
			array( 'controller.ai1ecsas', 'ai1ec_view_args_array' )
		);
	}
}
