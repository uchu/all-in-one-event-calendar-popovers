<?php
/**
 * Plugin Name: All-in-One Event Calendar Popovers by Time.ly
 * Plugin URI: http://time.ly/
 * Description: Popovers for All-in-One Event Calendar by Time.ly
 * Author: Time.ly Network Inc.
 * Author URI: http://time.ly/
 * Version: 0.0.1.0
 * Text Domain: all-in-one-event-calendar-popovers
 * Domain Path: /language
 */

define( 'AI1ECP_PLUGIN_NAME', 'all-in-one-event-calendar-popovers' );
define( 'AI1ECP_PATH',        dirname( __FILE__ ) );
define( 'AI1ECP_VERSION',     '0.0.1.0' );
define( 'AI1ECP_URL',         plugins_url( '', __FILE__ ) );
define( 'AI1ECP_FILE',        __FILE__ );

function ai1ec_popovers( Ai1ec_Registry_Object $registry ) {
	$registry->extension_acknowledge( AI1ECP_PLUGIN_NAME, AI1ECP_PATH );
	load_plugin_textdomain(
		AI1ECP_PLUGIN_NAME,
		false,
		basename( AI1ECP_PATH ) . DIRECTORY_SEPARATOR . 'language'
	);
	$registry->get( 'controller.ai1ecpop' )->init( $registry );
}

// On activation all plugins are loaded but plugins_loaded has not been triggered.
function ai1ec_popovers_activation() {
	global $ai1ec_registry;
	// If no global registry is set, Core is not active.
	if (
		null === $ai1ec_registry ||
		! ( $ai1ec_registry instanceof Ai1ec_Registry_Object )
	) {
		return trigger_error(
			__(
				'All In One Event Calendar must be installed to activate extensions',
				AI1ECP_PLUGIN_NAME
			),
			E_USER_ERROR
		);
	}
	require_once AI1ECP_PATH . DIRECTORY_SEPARATOR . 'app' .
		DIRECTORY_SEPARATOR . 'controller' . DIRECTORY_SEPARATOR .
		'ai1ecpop.php';
	// No need to register this, we are redirected afterwards.
	$controller = new Ai1ec_Controller_Ai1ecsas();
	$method_exists = method_exists( $controller, 'check_compatibility' );
	if ( ! $method_exists || ! $controller->check_compatibility( AI1EC_VERSION ) ) {
		$message = __(
			'Could not activate the Popovers add-on: All-in-One Event Calendar version %s or higher is required.',
			AI1ECP_PLUGIN_NAME
		);
		$version = $controller->minimum_core_required();
		$message = sprintf( $message, $version );
		return trigger_error( $message, E_USER_ERROR );
	}
	$controller->show_settings( $ai1ec_registry );
	$controller->on_activation( $ai1ec_registry );
}

register_activation_hook( __FILE__, 'ai1ec_popovers_activation' );
add_action( 'ai1ec_loaded', 'ai1ec_popovers' );
