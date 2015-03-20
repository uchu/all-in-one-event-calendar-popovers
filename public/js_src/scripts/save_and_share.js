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
			$counter               = $( '.ai1ec-saved-events-count' ),
			$show_saved            = $( '.ai1ec-show-saved' ),
			$close_button          = $( '.ai1ec-close-saved-events' ),
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
			$share_button          = $( '.ai1ec-saved-events'),
			$exit_button           = $( '.ai1ec-saved-events-exit'),
			$title                 = $( '#ai1ec-share-events-title' ),
			$events_title          = $( '.ai1ec-saved-events-title' ),
			$multiple              = $( '.ai1ec-share-multiple' ),
			$open                  = $( '#ai1ec-share-open' ),
			update_counter         = function() {
				var count = get_saved_events_ids().length;
				if ( ! count || $events_title.length ) {
					$show_saved.addClass( 'ai1ec-hidden' );
				} else {
					$show_saved.removeClass( 'ai1ec-hidden' );
					$counter.text( '(' + count + ')' );
				}
				$show_saved.find( 'a' ).attr( 'href', get_url( true ) );
			},
			show_saved             = function() {
				$( this )
					.addClass( 'ai1ec-active' )
					.find( 'i.ai1ec-fa-star-o' )
						.removeClass( 'ai1ec-fa-star-o' )
						.addClass( 'ai1ec-fa-star' );

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
				$show_saved
					.removeClass( 'ai1ec-active' )
					.find( 'a' )
						.blur()
						.find( 'i.ai1ec-fa-star' )
							.removeClass( 'ai1ec-fa-star' )
							.addClass( 'ai1ec-fa-star-o' );

				return false;
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
					$event      = $this.closest( '.ai1ec-event' ),
					event_id    = (
						$event.length
						? $event.attr( 'class' ).match( /ai1ec-event-id-(\d+)/ )[1]
						: $this.data( 'post_id' )
					),
					ids         = get_saved_events_ids();

				mark_saved ( $this );
				// Switch the state of duplicating buttons in details view.
				if ( $this.data( 'post_id' ) ) {
					mark_saved( $( '.ai1ec-action-star' ).not( $this ) );
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
				if (
					! $this.hasClass( 'ai1ec-selected' ) &&
					$show_saved.hasClass( 'ai1ec-active' )
				) {
					$show_saved.find( 'a' ).trigger( 'click' );
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
						+'|post_ids~';
				}
				url += get_saved_events_ids().join();
				return url;
			},
			shared_url             = get_url(),
			update_buttons         = function() {
				$google.attr(
					'href',
					$google.data( 'url' ) + encodeURIComponent( shared_url )
				);
				$twitter.attr(
					'href',
					$twitter.data( 'url' ) + encodeURIComponent( shared_url )
					+ '&text=' + encodeURIComponent( $twitter.data( 'text' ) )
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
				shared_url = $( '.ai1ec-views-dropdown .ai1ec-active a' ).attr( 'href' )
					+ 'saved_events~' + encoded_title();

				shared_url = shared_url.replace( /action~(\w+)/, '' )
					.replace( /\/\//g, '/')
					.replace( /:\//g, '://');

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
					var title = $events_title.find( 'h1' ).text();
					// Limit the title so it doesn't make the exit button too wide.
					if ( title.length > 12 ) {
						title = $.trim( title.substring( 0, 12 ) ) + '&hellip;'
					}
					$exit_button
						.removeClass( 'ai1ec-hidden' )
						.find( 'a' )
							.attr( 'href', ai1ec_calendar.calendar_url )
							.end()
						.find( 'span > i' )
							.html( title );

					$show_saved.addClass( 'ai1ec-hidden' );
				} else {
					$show_saved.removeClass( 'ai1ec-hidden' );
				}
			},
			mark_saved             = function( $button ) {
				$button
					.toggleClass( 'ai1ec-selected' )
					.find( 'i.ai1ec-fa' )
						.toggleClass( 'ai1ec-fa-star ai1ec-fa-star-o' );
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

					if ( ( new Date( $this.data( 'end' ) ) ).getTime() < now ) {
						ids.splice( ids.indexOf( event_id ), 1 );
						$this.remove();
					}
				} );
				if ( ids_length !== ids.length ) {
					localStorage.setItem( 'ai1ec_saved_events', ids.join( ',' ) );
					update_counter();
					if ( ids.length ) {
						trigger_view_init();
					} else {
						close_saved();
					}
				} else {
					$( this ).fadeOut();
				}
				return false;
			},
			on_view_init           = function() {
				update_current_view();
				var
					ids                  = get_saved_events_ids(),
					$single_event_button = $( '#timely-save-button .ai1ec-action-star' ),
					$clear               = $( '.ai1ec-clear-saved-buttons' );

				$( '.ai1ec-action-star' ).removeClass( 'ai1ec-selected' )
				for ( var i = 0; i < ids.length; i++ ) {
					mark_saved(
						$( '.ai1ec-event-id-' + ids[i] ).find( '.ai1ec-action-star' )
					);
				}
				// Toggle "saved" on event details page.
				if ( $single_event_button.length ) {
					if (
						-1 < $.inArray(
							$single_event_button.data( 'post_id' ).toString(),
							ids
						)
					) {
						mark_saved( $single_event_button );
					}
				}
				update_counter();
				for ( var i = 0; i < 2; i++ ) {
					$share_button
						.animate( { opacity: 0.5 }, 200 )
						.animate( { opacity: 1 }, 300  );
				}

				if ( $show_saved.hasClass( 'ai1ec-active' ) ) {
					// Move Clear buttons so they appear in the right place.
					$clear.clone( true ).insertAfter(
						$( '#ai1ec-calendar-view > div, #ai1ec-calendar-view > table' )
							.filter( function() {
								return this.className.match( /ai1ec-(\w+)-view/ );
							} ).first()
					).removeClass( 'ai1ec-hidden' );
				}
			};

		// Set event handlers.
		$( document ).on( 'click', '.ai1ec-close-saved-events', close_saved );
		$( document ).on( 'click', '.ai1ec-action-star', save );
		$( document ).on( 'click', '.ai1ec-saved-events', function() {
			$multiple.show();
			update_url();
		} );
		$( document ).on( 'initialize_view.ai1ec',
			'.ai1ec-calendar-view-container',
			on_view_init
		);
		$( document ).on( 'click', '.ai1ec-action-share', function() {
			$shorten.removeAttr( 'checked' );
			shared_url = $( this ).attr( 'data-url' ) || location.href;
			update_buttons();
			$multiple.hide();
			return false;
		} );
		$( document ).on( 'click', '.ai1ec-clear-saved', clear_all_saved );
		$( document ).on( 'click', '.ai1ec-clear-expired', clear_expired );
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
		//on_view_init();
	}

	domReady( init_save_and_share );
} );
