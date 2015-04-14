require(
	[
		'jquery_timely',
		'domReady',
		'ai1ec_calendar'
	],
	function( $, domReady, ai1ec_calendar ) {
	'use strict'; // jshint ;_;

	/**
	 * Initialization of popovers.
	 */
	var init_popovers = function() {
		
		// Do nothing if browser doesn't support localStorage
		try {
			localStorage.setItem( 'ai1ec_test', 1 );
			localStorage.removeItem( 'ai1ec_test' );
		} catch( e ) {
			return false;
		}
		// Add popovers
		$( '.ai1ec-bs-popover' ).each( function() {
			var
				$this = $( this ),
				popover_id = $( this ).data( 'popover-id' );

			if ( ! localStorage.getItem( 'ai1ec-popover-' + popover_id ) ) {
				$this.popover( {
					template  : '<div class="ai1ec-popover ai1ec-bs-popover-item" role="tooltip">\
						<div class="ai1ec-arrow"></div>\
						<h3 class="ai1ec-popover-title"></h3>\
						<div class="ai1ec-popover-content"></div></div>',
					title     : function() {
						var $this = $( this );
						return $this.data( 'title' )
							+ '<span class="ai1ec-dismiss" '
							+ 'data-popover-id="' + $this.data( 'popover-id' ) + '">&#x2715;'
							+ '</span>';
					},
					html      : true
				} )
				.addClass( 'ai1ec-bs-popover-enabled' )
				.popover( 'show' );
			}
		} );
			
		$( document ).on( 'click',
			'.ai1ec-dismiss',
			function() {
				var id = $( this ).data( 'popover-id' )
				$( '[data-popover-id="' + id + '"]' )
					.removeClass( 'ai1ec-bs-popover-enabled' )
					.popover( 'destroy' );

				localStorage.setItem(
					'ai1ec-popover-' + id, 1
				);
			}
		);
		
		// Using affixed toolbar needs repositioning.
		var reposition_popovers = function() {
			$( '.ai1ec-bs-popover-enabled' )
				.popover( 'show' );
		}
		if ( $( '.ai1ec-bs-popover-item:visible' ).length ) {
			$( document ).on( 'ai1ec-affixed.bs.affix ai1ec-affixed-top.bs.affix',
				'.ai1ec-calendar-toolbar',
				reposition_popovers
			);
		}
	}
	// Start initialization on DomReady.
	domReady( init_popovers );
} );
