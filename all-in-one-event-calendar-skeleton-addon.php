<?php
/**
 * Plugin Name: All-in-One Event Calendar Skeleton Addon by Time.ly
 * Plugin URI: http://time.ly/
 * Description: Demo addon displaying how to integrate with All-in-One Event Calendar by Time.ly
 * Author: Time.ly Network Inc.
 * Author URI: http://time.ly/
 * Version: 0.0.10
 * Text Domain: all-in-one-event-calendar-skeleton-addon
 * Domain Path: /language
 */

/**
 * =============================================================================
 *                                 DICTIONARY
 * =============================================================================
 *     * Core - short name for 'All-in-One Event Calendar' plugin
 */

/**
 * =============================================================================
 *                            PLUGIN SPECIFIC PREFIX
 * =============================================================================
 * Functions, constants, and class names should use prefix constructed the
 * following way:
 *     * split plugin directory name by '-' character into an array;
 *     * take first letter of each word from the array;
 *     * if you happen to have word 'AIOEC' - replace it with 'AI1EC'.
 *
 * In this case plugin name is 'all-in-one-event-calendar-skeleton-addon', so:
 *     * array( 'all', 'in', 'one', 'event', 'calendar', 'skeleton', 'addon' );
 *     * 'aioecsa';
 *     * 'ai1ecsa'.
 * That means prefix for constants will be 'AI1ECSA_', for functions 'ai1ecsa_'
 * and for class names - 'Ai1ecsa_'.
 *
 * ProTip: use name representing your own project, like 'jedi-style-calendar-header'
 * and then 'JSCH_', 'jsch_' and 'Jsch_' prefix for your constants, functions and
 * classes. This way you will avoid collisions with other developers.
 */

/**
 * =============================================================================
 *                                 PLUGIN NAME
 * =============================================================================
 * This is a convenience constant - it allows to not repeat yourself when you
 * need to use plugin name, like in loading text domain (for translations) and
 * similar.
 */
define( 'AI1ECSA_PLUGIN_NAME', 'all-in-one-event-calendar-skeleton-addon' );
/**
 * =============================================================================
 *                             PATH TO PLUGIN ROOT
 * =============================================================================
 * Please note - this is an important constant. It must be provided if you are
 * willing to use class loader provided by the Core.
 * Name of this constant is constructed by appending 'PATH' to the prefix
 * defined above.
 */
define( 'AI1ECSA_PATH',        dirname( __FILE__ ) );
/**
 * =============================================================================
 *                               PLUGIN VERSION
 * =============================================================================
 * This constant should be in sync with version number defined in plugin title.
 * While it is not used "automatically" it allows to make use of some automatics
 * like tracking if addon was updated and performing corresponding actions.
 */
define( 'AI1ECSA_VERSION',     '0.0.10' );
/**
 * =============================================================================
 *                           URL AND FILE PATHS
 * =============================================================================
 * The URL constant is convenient, if you want to load CSS/JavaScript/images
 * from your addon directory. If you are not planning on doing this - you may
 * skip the following line.
 * Constant identifying current file is used throughout Core to back-reference
 * your plugin. Please leave it as-is even if you do not use it.
 */
define( 'AI1ECSA_URL',         plugins_url( '', __FILE__ ) );
define( 'AI1ECSA_FILE',        __FILE__ );

/**
 * =============================================================================
 *                              CORE DEBUG
 * =============================================================================
 * There is one feature, which you may find useful during development, which is
 * called Core debug. You may enable it by adding the following line to your
 * [`wp-config.php`](http://codex.wordpress.org/Editing_wp-config.php)) file:
 * ```php
 * define( 'AI1EC_DEBUG', true );
 * ```
 * This will enable the Core debug mode (change 'true' to 'false' to disable it)
 * and that means that if you connected your plugin to the core (see
 * [section on bootstrapping](#bootstrap) for more on the topic) you will be able
 * to use [class loading](#class-loading).
 */

/**
 * =============================================================================
 *                             CLASS LOADING
 * =============================================================================
 * If you register your plugin with the Core - it allows you to use some of the
 * features. One of these is class loading.
 *
 * For it to work you need to have a  writable directory `./lib/bootstrap/` (if
 * you are using Git or similar - it is easiet to create empty file in it called
 * EMPTY - then it will be always versioned).` Your classes are collected when
 * you refresh any page with [Core debug](#core-debug) mode enabled.
 *
 * Now that class loading is enabled any class in your plugin might be loaded
 * using it's location.
 * For exampleif you have a class in file `./app/controller/ai1ecsa.php` then
 * you may load it using the following command:
 * ```php
 * $registry->get( 'controller.ai1ecsa' );
 * ```
 * Note that directories named 'app' or 'lib' are removed automatically to
 * increase readability. But if you have file named
 * `./app/controller/skeleton/view.php` then instead of `'controller.ai1ecsa'`
 * in the code block above you would use `'controller.skeleton.view'`.
 *
 * -----------------------------------------------------------------------------
 * Please be *respectful*
 * -----------------------------------------------------------------------------
 * Just like [function names in WordPress](http://codex.wordpress.org/Writing_a_Plugin)
 * you should make sure your file names are unique amongst other Core addons.
 * Instead of creating file `./app/controller/main.php` choose name like
 * `./app/controller/skeleton/optimus-prime.php` or
 * `./app/controller/walking-dead.php` whichever represents it's content better
 * while being unique.
 */

/**
 * =============================================================================
 *                               BOOTSTRAP
 * =============================================================================
 * This is so called "bootstrap" function - it connects your plugin to the Core
 * and performs minimal initialization including the loading of textdomain which
 * is mandatory if you are using translations.
 * Last line is important:
 *     * it shows use of class loading provided by the Core (see
 *       [Class Loading](#class-loading) section for more);
 *     * it calls `init` method on your controller, which will be explained in
 *       a page for [Ai1ecsa Controller](app/controller/ai1ecsa.md).
 *
 * @wp_hook ai1ec_loaded Action 'ai1ec_loaded' is triggered when WordPress native
 *                       action 'plugins_loaded' executes.
 */
function ai1ec_skeleton_addon( Ai1ec_Registry_Object $registry ) {
	$registry->extension_acknowledge( AI1ECSA_PLUGIN_NAME, AI1ECSA_PATH );
	load_plugin_textdomain(
		AI1ECSA_PLUGIN_NAME,
		false,
		basename( AI1ECSA_PATH ) . DIRECTORY_SEPARATOR . 'language'
	);
	$registry->get( 'controller.ai1ecsa' )->init( $registry );
}

/**
 * =============================================================================
 *                              SAFEGUARD
 * =============================================================================
 * When user activates a plugin it's good to check that your plugin will be able
 * to do anything. Otherwise you will waste user resources, and may even
 * disappoint your user, as he will think that your plugin does nothing.
 * Bellow is a piece of code, which you may copy as-is (just make sure to update
 * prefixes accordingly. The lines which you are ought to modify are accomponied
 * by a comment stating what to change and how.
 *
 * @wp_hook activation This function is triggered when a plugin is activated by
 *                     a user.
 */
// on activation all plugins are loaded but plugins_loaded has not been triggered.
function ai1ec_skeleton_addon_activation() {
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
				AI1ECSA_PLUGIN_NAME
			),
			E_USER_ERROR
		);
	}
	require_once AI1ECSA_PATH . DIRECTORY_SEPARATOR . 'app' .
		DIRECTORY_SEPARATOR . 'controller' . DIRECTORY_SEPARATOR .
		'ai1ecsa.php'; // please change 'ai1ecsa.php' to the file name of your [main controller](app/controller/ai1ecsa.md)
	// no need to register this, we are redirected afterwards.
	$controller = new Ai1ec_Controller_Ai1ecsa(); // please change 'Ai1ec_Controller_Ai1ecsa' to the name of your [main controller](app/controller/ai1ecsa.md)
	if ( ! $controller->check_compatibility( AI1EC_VERSION ) ) {
		$message = __(
			'Could not activate the Skeleton add-on: All-in-One Event Calendar version %s or higher is required.',
			AI1ECSA_PLUGIN_NAME // please change prefix `AI1ECSA` to your [plugins prefix](#plugin-specific-prefix)
		);
		$version = $controller->minimum_core_required();
		$message = sprintf( $message, $version );
		return trigger_error( $message, E_USER_ERROR );
	}
	$controller->show_settings( $ai1ec_registry );
	$controller->on_activation( $ai1ec_registry );
}

register_activation_hook( __FILE__, 'ai1ec_skeleton_addon_activation' );
add_action( 'ai1ec_loaded', 'ai1ec_skeleton_addon' );