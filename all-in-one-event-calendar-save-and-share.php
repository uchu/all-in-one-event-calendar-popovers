<?php
/**
 * Plugin Name: All-in-One Event Calendar Save and Share by Time.ly
 * Plugin URI: http://time.ly/
 * Description: Save and share events in All-in-One Event Calendar by Time.ly
 * Author: Time.ly Network Inc.
 * Author URI: http://time.ly/
 * Version: 0.0.11
 * Text Domain: all-in-one-event-calendar-save-and-share
 * Domain Path: /language
 */

define( 'AI1ECSAS_PLUGIN_NAME', 'all-in-one-event-calendar-save-and-share' );
define( 'AI1ECSAS_PATH',        dirname( __FILE__ ) );
define( 'AI1ECSAS_VERSION',     '0.0.11' );
define( 'AI1ECSAS_URL',         plugins_url( '', __FILE__ ) );
define( 'AI1ECSAS_FILE',        __FILE__ );

function ai1ec_save_and_share( Ai1ec_Registry_Object $registry ) {
	$registry->extension_acknowledge( AI1ECSAS_PLUGIN_NAME, AI1ECSAS_PATH );
	load_plugin_textdomain(
		AI1ECSAS_PLUGIN_NAME,
		false,
		basename( AI1ECSAS_PATH ) . DIRECTORY_SEPARATOR . 'language'
	);
	$registry->get( 'controller.ai1ecsas' )->init( $registry );
}


// on activation all plugins are loaded but plugins_loaded has not been triggered.
function ai1ec_save_and_share_activation() {
	global $ai1ec_registry;
	// if no global registry is set, core is not active
	// i could have checked for existance of extension class but class_exist calls are not reliable
	if (
		null === $ai1ec_registry ||
		! ( $ai1ec_registry instanceof Ai1ec_Registry_Object )
	) {
		return trigger_error(
			__(
				'All In One Event Calendar must be installed to activate extensions',
				AI1ECSAS_PLUGIN_NAME
			),
			E_USER_ERROR
		);
	}
	require_once AI1ECSAS_PATH . DIRECTORY_SEPARATOR . 'app' .
		DIRECTORY_SEPARATOR . 'controller' . DIRECTORY_SEPARATOR .
		'ai1ecsas.php';
	// no need to register this, we are redirected afterwards.
	$controller = new Ai1ec_Controller_Ai1ecsas();
	$method_exists = method_exists( $controller, 'check_compatibility' );
	if ( ! $method_exists || ! $controller->check_compatibility( AI1EC_VERSION ) ) {
		$message = __(
			'Could not activate the Save and Share add-on: All-in-One Event Calendar version %s or higher is required.',
			AI1ECSAS_PLUGIN_NAME
		);
		$version = $controller->minimum_core_required();
		$message = sprintf( $message, $version );
		return trigger_error( $message, E_USER_ERROR );
	}
	$controller->show_settings( $ai1ec_registry );
	$controller->on_activation( $ai1ec_registry );
}

register_activation_hook( __FILE__, 'ai1ec_save_and_share_activation' );
add_action( 'ai1ec_loaded', 'ai1ec_save_and_share' );