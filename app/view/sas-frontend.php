<?php

/**
 * View representing a frontend for Save and Share.
 *
 * @author       Time.ly Network, Inc.
 * @since        1.0
 * @package      AI1ECSAS
 * @subpackage   AI1ECSAS.View
 */
class Ai1ecsas_Frontend extends Ai1ec_Base {

	/**
	 * Add Save and Share buttons to the views.
	 *
	 * @return string HTML.
	 */
	public function add_buttons( $buttons ) {
		$loader   = $this->_registry->get( 'theme.loader' );
		$file     = $loader->get_file(
			'buttons.twig',
			array(
				'text_save'  => __( 'Save', AI1ECSAS_PLUGIN_NAME ),
				'text_saved' => __( 'Saved', AI1ECSAS_PLUGIN_NAME ),
				'text_share' => __( 'Share', AI1ECSAS_PLUGIN_NAME )
			),
			false
		);
		$buttons .= $file->get_content();
		return $buttons;
	}

	/**
	 * Add Save and Share buttons to the Event details page.
	 *
	 * @return string HTML for toolbar.
	 */
	public function add_buttons_for_event_details( $buttons ) {
		$loader   = $this->_registry->get( 'theme.loader' );
		$file     = $loader->get_file(
			'buttons.twig',
			array(
				'single'     => true,
				'text_save'  => __( 'Save', AI1ECSAS_PLUGIN_NAME ),
				'text_saved' => __( 'Saved', AI1ECSAS_PLUGIN_NAME ),
				'text_share' => __( 'Share', AI1ECSAS_PLUGIN_NAME )
			),
			false
		);
		$buttons .= $file->get_content();
		$buttons .= $this->add_share_modal();
		return $buttons;
	}

	/**
	 * Add Save and Share buttons to the filter toolbar.
	 *
	 * @return string HTML for toolbar.
	 */
	public function add_toolbar_buttons( $buttons ) {
		$loader   = $this->_registry->get( 'theme.loader' );
		$parser = $this->_registry->get( 'http.request.parser' );
		$parser->parse();
		$file     = $loader->get_file(
			'toolbar-buttons.twig',
			array(
				'request'            => $parser,
				'text_saved_events'  => __( 'Your Saved Events', AI1ECSAS_PLUGIN_NAME ),
				'text_exit'          => __( 'Exit', AI1ECSAS_PLUGIN_NAME ),
				'text_share'         => __( 'Share these Events', AI1ECSAS_PLUGIN_NAME )
			),
			false
		);
		$buttons .= $file->get_content();
		return $buttons;
	}

	/**
	 * Add Save and Share buttons to the filter toolbar.
	 *
	 * @return string HTML for toolbar.
	 */
	public function add_clear_buttons( $buttons ) {
		$loader   = $this->_registry->get( 'theme.loader' );
		$file     = $loader->get_file(
			'clear-buttons.twig',
			array(
				'text_clear_expired' => __(
					'Clear Expired Events',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_clear_all'     => __(
					'Clear all Saved Events',
					AI1ECSAS_PLUGIN_NAME
				)
			),
			false
		);
		$buttons .= $file->get_content();
		return $buttons;
	}

	/**
	 * Add Share modal.
	 *
	 * @return string HTML for modal dialog.
	 */
	public function add_share_modal( $html = '' ) {
		$loader = $this->_registry->get( 'theme.loader' );
		$file   = $loader->get_file( 'share-modal.twig',
			array(
				'text_share_event'            => __(
					'Share Event',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_multiple'               => __(
					's',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_step_1'                 => __(
					'Step 1.',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_step_2'                 => __(
					'Step 2.',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_step_1_title'           => __(
					'Give your custom calendar a title.',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_step_2_title'           => __(
					'Share or bookmark this link or click on a button below:',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_custom_calendar'        => __(
					'ex. Custom Calendar',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_shorten'                => __(
					'Shorten',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_open'                   => __(
					'Open',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_email'                  => __(
					'Email',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_facebook'               => __(
					'Facebook',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_twitter'                => __(
					'Twitter',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_google_plus'            => __(
					'Google+',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_check_out_these_events' => __(
					'Check out these events',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_click_on_this_link'     => __(
					'Click on this link to see some cool events:',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_enter_email'            => __(
					'Enter email address',
					AI1ECSAS_PLUGIN_NAME
				),
				'text_send'                   => __(
					'Send',
					AI1ECSAS_PLUGIN_NAME
				)
			),
			false
		);
		$html  .= $file->get_content();
		return $html;
	}

	/**
	 * Show only unique events when viewing Saved events.
	 *
	 * @return boolean If to show only unique events.
	 */
	public function show_unique_events() {
		$parser = $this->_registry->get( 'http.request.parser' );
		$parser->parse();
		return ( bool ) (
			$parser['my_saved_events'] ||
			$parser['saved_events']
		);
	}

	/**
	 * Add title panel for shared events.
	 *
	 * @param string $html Input $html.
	 *
	 * @return string HTML for a panel with custom heading.
	 */
	public function add_shared_events_title( $html ) {
		$loader = $this->_registry->get( 'theme.loader' );
		$parser = $this->_registry->get( 'http.request.parser' );
		$parser->parse();
		$file   = $loader->get_file(
			'shared-title.twig',
			array(
				'request' => $parser
			),
			false
		);
		$html  .= $file->get_content();
		return $html;
	}
}
