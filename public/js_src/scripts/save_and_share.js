require(
	[
		'jquery_timely',
		'domReady',
		'ai1ec_calendar'
	],
	function( $, domReady, ai1ec_calendar ) {
	'use strict'; // jshint ;_;

	/**
	 * Initialization of events saving and sharing.
	 */
	var init_save_and_share = function() {
		var
			get_saved_events_ids   = function() {
				var ids = localStorage.getItem( 'ai1ec_saved_events' );
				return ids ? ids.split( ',' ) : [];
			},
			$counter               = $( '.ai1ec-sas-saved-events-count' ),
			$show_saved            = $( '.ai1ec-sas-show-saved' ),
			$url_input             = $( '#ai1ec-share-events-link' ),
			$modal                 = $( '#timely-share-modal' ),
			$shorten               = $( '#a1iec-shorten' ),
			$email                 = $( '#ai1ec-share-email' ),
			$email_form            = $( '.ai1ec-email-form' ),
			$send_email            = $( '#ai1ec-share-email-send' ).closest( 'form' ),
			$email_field           = $( '#ai1ec-share-email-field' ),
			$email_body            = $( '#ai1ec-share-email-body' ),
			$facebook              = $( '#ai1ec-share-facebook' ),
			$twitter               = $( '#ai1ec-share-twitter' ),
			$google                = $( '#ai1ec-share-google' ),
			$share_button          = $( '.ai1ec-sas-saved-events'),
			$exit_button           = $( '.ai1ec-sas-saved-events-exit'),
			$title                 = $( '#ai1ec-share-events-title' ),
			$events_title          = $( '.ai1ec-sas-saved-events-title' ),
			$multiple              = $( '.ai1ec-share-multiple' ),
			$open                  = $( '#ai1ec-share-open' ),
			update_counter         = function() {
				var count = get_saved_events_ids().length;
				// Toggle the visibility of the Saved Events button.
				if ( ! count || $events_title.length ) {
					$show_saved
						.addClass( 'ai1ec-hidden' );
				} else {
					$show_saved.removeClass( 'ai1ec-hidden' );
					$counter.text( '(' + count + ')' );
				}
				$show_saved.find( 'a' ).attr( 'href', get_url( true ) );
			},
			show_saved             = function( event, update ) {
				var $this = $( this );
				// Don't close if we just updated the list.
				if ( ! update && $this.hasClass( 'ai1ec-active' ) ) {
					close_saved();
					return false;
				}
				$this
					.addClass( 'ai1ec-active' )
					.find( 'i.ai1ec-fa-star-o' )
						.removeClass( 'ai1ec-fa-star-o' )
						.addClass( 'ai1ec-fa-star' )
						.end()
					.find( 'a' )
						.addClass( 'ai1ec-active' );

				$exit_button.addClass( 'ai1ec-hidden' );
				$events_title.remove();
			},
			close_saved            = function() {
				var
					$active_view_link = $( '.ai1ec-views-dropdown .ai1ec-active a' ),
					href              = $active_view_link.attr( 'href' )
						.replace( /(\/|\|)post_ids~((\d+)(,?))+/g, '' )
						.replace( /(\/|\|)time_limit~1/, '' );

				$active_view_link.attr( 'href', href ).trigger( 'click' );
				clear_saved_button();
				return false;
			},
			clear_saved_button     = function() {
				$show_saved
					.removeClass( 'ai1ec-active' )
					.find( 'a' )
						.removeClass( 'ai1ec-active' )
						.blur()
						.find( 'i.ai1ec-fa-star' )
							.removeClass( 'ai1ec-fa-star' )
							.addClass( 'ai1ec-fa-star-o' );
			},
			current_view,
			update_current_view    = function() {
				current_view = 	$( '.ai1ec-views-dropdown .ai1ec-active' )
					.attr( 'data-action' );
			},
			trigger_view_init      = function() {
				$( '.ai1ec-calendar-view-container' )
					.trigger( 'initialize_view.ai1ec', true );
			},
			save                   = function() {
				var
					$this       = $( this ),
					$event      = $this.closest( '.ai1ec-event, .ai1ec-single-event' ),
					event_id    = (
						$event.length
						? $event.attr( 'class' ).match( /ai1ec-event-id-(\d+)/ )[1]
						: $this.data( 'post_id' )
					),
					ids         = get_saved_events_ids();

				mark_saved ( $this, ! $this.hasClass( 'ai1ec-selected' ) );
				// Switch the state of duplicating buttons in details view.
				if ( $this.data( 'post_id' ) ) {
					mark_saved( $( '.ai1ec-sas-action-star' ).not( $this ), $this.hasClass( 'ai1ec-selected' ) );
				}
				if ( $this.hasClass( 'ai1ec-selected' ) ) {
					if ( -1 === $.inArray( event_id, ids ) ) {
						ids.push( event_id );
					}
				} else {
					ids.splice( ids.indexOf( event_id ), 1 );
				}
				localStorage.setItem( 'ai1ec_saved_events', ids.join( ',' ) );
				update_counter();
				// Update Saved events view if we are removing an item from it.
				if (
					! $this.hasClass( 'ai1ec-selected' ) &&
					$show_saved.hasClass( 'ai1ec-active' )
				) {
					$show_saved.find( 'a' ).trigger( 'click', true );
				}
				// Remove active class if there are no more saved events left.
				if ( !get_saved_events_ids().length ) {
					clear_saved_button();
				}
				return false;
			},
			encoded_title          = function() {
				return encodeURIComponent( $title.val() || 'Custom Calendar' )
					.replace( /\'/g, '%27' )
					.replace( /\-/g, '%2D' )
					.replace( /\_/g, '%5F' )
					.replace( /\./g, '%2E' )
					.replace( /\!/g, '%21' )
					.replace( /\~/g, '%7E' )
					.replace( /\*/g, '%2A' )
					.replace( /\#/g, '%23' )
					.replace( /\(/g, '%28' )
					.replace( /\)/g, '%29' );
			},
			is_pretty_mode         = function() {
				var $object = $( '.ai1ec-views-dropdown .ai1ec-active a' )
					.attr( 'href' );
				if ( undefined === $object ) {
					return false;
				}

				return (
					-1 === $( '.ai1ec-views-dropdown .ai1ec-active a' )
						.attr( 'href' )
							.indexOf( 'ai1ec=' )
				);
			},
			get_url                = function( local ) {
				var url;
				if ( $events_title.length ) {
					$title.val( $events_title.find( 'h1' ).text() );
				}
				if ( is_pretty_mode() ) {
					url            = ai1ec_calendar.calendar_url
						+ 'action~' + current_view
						+ (
							! local ? '/saved_events~' + encoded_title()
							: '/my_saved_events~1'
						)
						+ '/exact_date~1'
						+ '/post_ids~';
				} else {
					url            = ai1ec_calendar.calendar_url
						+ ( -1 === ai1ec_calendar.calendar_url.indexOf( '?' ) ? '?' : '&' )
						+ 'ai1ec=action~' + current_view
						+ (
							! local ? '|saved_events~' + encoded_title()
							: '|my_saved_events~1'
						)
						+ '|exact_date~1'
						+ '|post_ids~';
				}
				url += get_saved_events_ids().join();
				return url;
			},
			shared_url             = get_url(),
			// $event is passed only when sharing a signle event.
			update_buttons         = function( $event ) {
				var twitter_message = $twitter.data( 'view-text' );
				if ( $event && $event.length ) {
					var
						twitter_pattern = $twitter.data( 'single-text' ),
						event_title     = (
							$.trim( $event.find( '.ai1ec-event-title' )
								.contents().get(0).nodeValue
							) ||
							$event.find( '.ai1ec-load-event' )
								.contents().get(0).nodeValue
						),
						event_venue     = $event.find( '.ai1ec-event-location' )
							.text().replace( /@/, '' ),
						event_date      = (
							$.trim( $event.find( '.ai1ec-event-time')
								.contents().get(0).nodeValue
							) ||
							$event.find( '.ai1ec-event-time' ).text()
						).split( '@' )[0];

					twitter_message = twitter_pattern
						.replace( /\[title\]/, event_title )
						.replace( /\[venue\]/, event_venue )
						.replace( /\[date\]/, event_date )
						// Remove multiple spaces.
						.replace( /\s{2,}/g, ' ' );
				}
				$twitter.attr(
					'href',
					$twitter.data( 'url' ) + encodeURIComponent( shared_url )
					+ '&text=' + encodeURIComponent( twitter_message )
				);
				$google.attr(
					'href',
					$google.data( 'url' ) + encodeURIComponent( shared_url )
				);
				$facebook.attr(
					'href',
					$facebook.data( 'url' )
					+ '&p[url]=' + encodeURIComponent( shared_url )
				);
				$email.data( 'url', shared_url )
				$url_input.val( shared_url );
				$open.attr( 'href', shared_url );
			},
			update_url             = function() {
				shared_url = $( '.ai1ec-views-dropdown .ai1ec-active a' ).attr( 'href' );
				shared_url = shared_url.replace( /action~(\w+)/, '' )
					.replace( /\/\//g, '/')
					.replace( /:\//g, '://');

				if ( $( '.timely-widget' ).length ) {
					shared_url = location.href + '#view|'
						+ shared_url
							.replace( ai1ec_calendar.calendar_url, '' )
							.replace( /\//g, '|' )
							.split( '?' )[0];
				}
				shared_url += 'saved_events~' + encoded_title();
				update_buttons();
				$shorten.removeAttr( 'checked' );
			},
			shorten_url            = function() {
				if ( ! $shorten.is( ':checked' ) ) {
					if ( ! $multiple.is( ':visible' ) ) {
						shared_url = $url_input.data( 'original-url' );
						update_buttons();
					} else {
						update_url();
					}
					return;
				}
				$url_input.data( 'original-url', shared_url );
				$.ajax( {
					url: 'https://www.googleapis.com/urlshortener/v1/url?shortUrl=http://goo.gl/fbsS',
					type: 'POST',
					contentType: 'application/json; charset=utf-8',
					data: '{longUrl: "' + shared_url +'"}',
					dataType: 'json',
					success: function( data ) {
						shared_url = data.id;
					},
					complete: function() {
						update_buttons();
					}
				} );
			},
			open_window            = function() {
				var
					height = 400,
					width  = 500;

				window.open(
					$( this ).attr( 'href' ),
					'Sharing Events',
					'width=' + width + ',height=' + height
					+ ',toolbar=0,status=0,left=' + ( screen.width / 2 - width / 2 )
					+ ',top=' + ( screen.height / 2 - height / 2 )
				);
				$email_form.addClass( 'ai1ec-hidden' );
				return false;
			},
			resolve_buttons_states = function() {
				// Resolve the states of Share/Exit buttons.
				if ( $events_title.length ) {
					var
						title    = $events_title.find( 'h1' ).text(),
						exit_url = $( '.timely-widget' ).length
							? location.href
							: ai1ec_calendar.calendar_url;

					// Limit the title so it doesn't make the exit button too wide.
					if ( title.length > 12 ) {
						title = $.trim( title.substring( 0, 12 ) ) + '&hellip;'
					}
					$exit_button
						.removeClass( 'ai1ec-hidden' )
						.find( 'a' )
							.attr( 'href', exit_url )
							.end()
						.find( 'span > i' )
							.html( title );

					$show_saved.addClass( 'ai1ec-hidden' );
				} else {
					$show_saved.removeClass( 'ai1ec-hidden' );
				}
			},
			mark_saved             = function( $button, saved ) {
				if ( saved ) {
					$button
						.addClass( 'ai1ec-selected' )
						.find( 'i.ai1ec-fa' )
							.removeClass( 'ai1ec-fa-star-o' )
							.addClass( 'ai1ec-fa-star' );
				} else {
					$button
						.removeClass( 'ai1ec-selected' )
						.find( 'i.ai1ec-fa' )
							.addClass( 'ai1ec-fa-star-o' )
							.removeClass( 'ai1ec-fa-star' );
				}
			},
			clear_all_saved        = function() {
				localStorage.removeItem( 'ai1ec_saved_events' );
				close_saved();
				return false;
			},
			clear_expired          = function() {
				var
					now        = ( new Date() ).getTime(),
					ids        = get_saved_events_ids(),
					ids_length = ids.length;

				$( '.ai1ec-event:visible' ).each( function() {
					var
						$this    = $( this ),
						event_id = $this.attr( 'class' ).match( /ai1ec-event-id-(\d+)/ )[1];

					// Compare the end of each event with the current date.
					if ( ( new Date( $this.data( 'end' ) ) ).getTime() < now ) {
						// Remove the event from IDs list and from the page.
						ids.splice( ids.indexOf( event_id ), 1 );
						$this.remove();
					}
				} );
				// Remove empty Date containers.
				$( '.ai1ec-date-events' ).each( function() {
					var $this = $( this );
					if ( ! $this.children().length ) {
						$this.closest( '.ai1ec-date' ).remove();
					}
				} );
				// Length of visible elements changed.
				if ( ids_length !== ids.length ) {
					localStorage.setItem( 'ai1ec_saved_events', ids.join( ',' ) );
					update_counter();
					if ( ids.length ) {
						$( 'a.ai1ec-load-view', $show_saved )
							.trigger( 'click', true );
					} else {
						close_saved();
					}
				} else {
					// Hide the Clear Expired button.
					$( this ).fadeOut();
				}

				return false;
			},
			on_view_init           = function() {
				update_current_view();
				var
					ids                  = get_saved_events_ids(),
					$single_event_button = $( '.single-ai1ec_event .ai1ec-sas-action-star' ),
					$clear               = $( '.ai1ec-sas-clear-saved-buttons' );

				$( '.ai1ec-sas-action-star' ).removeClass( 'ai1ec-selected' )
				// Toggle "saved" on event details page.
				if ( $single_event_button.length ) {
					if (
						-1 < $.inArray(
							$single_event_button.closest( '.ai1ec-single-event' ).attr( 'class' ).match( /ai1ec-event-id-(\d+)/ )[1],
							ids
						)
					) {
						mark_saved( $single_event_button, true );
					}
				} else {
					for ( var i = 0; i < ids.length; i++ ) {
						var $button = $( '.ai1ec-event-id-' + ids[i] ).find( '.ai1ec-sas-action-star' )
						mark_saved(
							$button,
							true
						);
					}
				}
				update_counter();
				// Share button blinks when view is loaded.
				for ( var i = 0; i < 2; i++ ) {
					$share_button
						.animate( { opacity: 0.5 }, 200 )
						.animate( { opacity: 1 }, 300  );
				}
				// Manipulate with Clear buttons if needed.
				if (
					$show_saved.hasClass( 'ai1ec-active' ) &&
					! $clear.closest( '.ai1ec-calendar-view').length
				) {
					// Move Clear buttons so they appear in the right place.
					$clear.clone( true ).insertAfter(
						$( '#ai1ec-calendar-view > div, #ai1ec-calendar-view > table' )
							.filter( function() {
								return this.className.match( /ai1ec-(\w+)-view/ );
							} ).first()
					).removeClass( 'ai1ec-hidden' );
				}
			};

		// Handling a click on a Save button.
		$( document ).on( 'click', '.ai1ec-sas-action-star', save );
		$( document ).on( 'click', '.ai1ec-sas-saved-events', function() {
			$multiple.show();
			update_url();
		} );
		// It fires each time new view is ready.
		$( document ).on( 'initialize_view.ai1ec',
			'.ai1ec-calendar-view-container',
			on_view_init
		);
		// Handling a click on a Share button.
		// These buttons also open a Bootstrap modal.
		$( document ).on( 'click', '.ai1ec-sas-action-share', function() {
			$shorten.removeAttr( 'checked' );
			// Find a link to the event details or use current URL.
			var $event = $( this ).closest( '.ai1ec-popover, .ai1ec-event' );
			shared_url = $event.find( '.ai1ec-load-event:first' )
				.attr( 'href' )
				|| location.href;

			// Special URL pattern if used in a JS widget.
			if ( $( this ).closest( '.timely-widget' ).length ) {
				var
					instance_id = $event.attr( 'class' )
						.match( /ai1ec-event-instance-id-(\d+)/ )[1],
					event_name  = function() {
						var name = shared_url.match( /\/event\/([\w-]+)/ );
						if ( ! name ) {
							name = shared_url.match( /\?ai1ec_event=([\w-]+)&/ );
						}
						return name ? name[1] : undefined;
					};
					shared_url  = location.href + '#event|'
						+ event_name() + '|' + instance_id;
			}
			update_buttons( $event );
			$multiple.hide();
			return false;
		} );
		// Handling a click on Clear buttons (when viewing Saved events).
		$( document ).on( 'click', '.ai1ec-sas-clear-saved', clear_all_saved );
		$( document ).on( 'click', '.ai1ec-sas-clear-expired', clear_expired );
		// Events handlers for the Share dialog.
		$title.on( 'keyup change', update_url );
		$shorten.on( 'click', shorten_url );
		$facebook.on( 'click', open_window );
		$google.on( 'click', open_window );
		$twitter.on( 'click', open_window );
		$email.on( 'click', function() {
			$email_form.removeClass( 'ai1ec-hidden' );
			return false;
		} );
		$email_field.on( 'keyup change', function() {
			$send_email.attr(
				'action',
				'mailto:' + $( this ).val()
			);
			$email_body.val(
				$email_body.data( 'body' ) + ' ' + $email.data( 'url' )
			);
		} );
		$show_saved.on( 'click', show_saved );

		// Initialization on page load.
		resolve_buttons_states();
		update_current_view();
		update_counter();
		on_view_init();
	}
	// Start initialization on DomReady.
	domReady( init_save_and_share );
} );
