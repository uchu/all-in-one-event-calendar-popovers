( {
	appDir              : '../',
	baseUrl             : './', // This is relative to appDir.
	dir                 : '../../js', // This is relative to this file's dir.
	keepBuildDir        : false,
	fileExclusionRegExp : /(jasmine|build|jshintr|^\.|.bat|.sh$)/,
	mainConfigFile      : '../main.js', // This is relative to this file's dir.
	// optimize            : 'none', // Uncomment this line if you need to debug.
	modules             : [
		{
			name: 'scripts/save_and_share'
		}
	],
	namespace: 'timely', // Set the namespace.
	paths: {
		// These are created dynamically.
		'ai1ec_calendar' : 'empty:',
		'ai1ec_config'   : 'empty:',
		'jquery_timely'  : 'empty:',
		'domReady'       : 'empty:'
	},
	wrap: false,
	removeCombined: true
} )
