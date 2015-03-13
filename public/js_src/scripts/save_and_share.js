define(
	[
		'jquery_timely',
		'ai1ec_config',
		'scripts/calendar',
		'scripts/calendar/load_views'
	],
	function(
		$,
		ai1ec_config,
		calendar,
		load_views
	) {
	'use strict'; // jshint ;_;

	var start = function() {
		console.log( 'SAS started' )
	}


	return {
		start: start
	}
} );
