<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function wp_enqueue_js() {
	// Frontend scripts.
	if ( ! is_admin() ) {
		// Enqueue vendors first.
		wp_enqueue_script( 'wp_vendorsJs', get_template_directory_uri() . '/assets/js/vendors.min.js' );

		// Enqueue custom JS after vendors.
		wp_enqueue_script( 'wp_customJs', get_template_directory_uri() . '/assets/js/custom.min.js' );

		// Minified and Concatenated styles.
		wp_enqueue_style( 'wp_style', get_template_directory_uri() . '/style.min.css', array(), '1.0', 'all' );
	}
}

add_action( 'wp_enqueue_scripts', 'wp_enqueue_js' );

function load_custom_wp_admin_assets() {
	// Enqueue admin custom JS
	wp_enqueue_script( 'admin_js', get_template_directory_uri() . '/assets/admin/dist/admin.min.js' );
	wp_localize_script('wp_customJs', 'ajaxurl', admin_url( 'admin-ajax.php' ) ); 

	// Minified and Concatenated admin styles.
	wp_enqueue_style( 'admin_styles', get_template_directory_uri() . '/assets/admin/dist/admin-styles.min.css', array(), '1.0', 'all' );
}

add_action( 'admin_enqueue_scripts', 'load_custom_wp_admin_assets' );

/* INCLUDE ALL CPT FILES */
foreach(glob(get_template_directory() . "/cpt/*.php") as $file){
	require $file;
}

/* INCLUDE ALL CONTROLLERS FILES */ 
foreach(glob(get_template_directory() . "/controllers/*.php") as $file){ 
	require $file; 
}

/* INCLUDE ALL CUSTOMIZATIONS FILES */
foreach(glob(get_template_directory() . "/customizations/*.php") as $file){
	require $file;
}

/**
* Register navigation menus
* @link https://developer.wordpress.org/reference/functions/register_nav_menus/
*/
register_nav_menus([
    'primary_navigation' => __tr('Primary Navigation')
]);

add_theme_support( 'post-thumbnails' );

// YOU SHOULD NOT ADD CODE HERE