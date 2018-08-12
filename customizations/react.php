<?php

if ( !in_array( $_SERVER['REMOTE_ADDR'], array('127.0.0.1') ) ) {
    // PROD
    echo 'prod';
    $JSfiles = get_template_directory() . '/custom-admin/build/static/js/';
    $react_js_to_load = '';
    foreach($JSfiles as $filename) {
        if(strpos($filename,'.js')&&!strpos($filename,'.js.map')) {
            $react_js_to_load = get_template_directory() . '/custom-admin/build/static/js/' . $filename;
        }
    }
} else {
  $react_js_to_load = 'http://localhost:3002/static/js/bundle.js';
}

wp_enqueue_script('custom-admin', $react_js_to_load, '', mt_rand(10,1000), true);

// Override posts per page
// function exposition_override_per_page( $params ) {
// 	if ( isset( $params ) AND isset( $params[ 'posts_per_page' ] ) ) {
// 		$params[ 'posts_per_page' ] = PHP_INT_MAX;
// 	}
// 	return $params;
// }
// add_action( 'rest_exposition_query', 'exposition_override_per_page' );