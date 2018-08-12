<?php

// Register Custom Post Type
function custom_post_type_object() {

	$labels = array(
		'name'                  => _x( 'Objects', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Object', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Object', 'text_domain' ),
		'name_admin_bar'        => __( 'Object', 'text_domain' ),
		'archives'              => __( 'Object Archives', 'text_domain' ),
		'attributes'            => __( 'Object Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Object:', 'text_domain' ),
		'all_items'             => __( 'All Objects', 'text_domain' ),
		'add_new_item'          => __( 'Add New Object', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New Object', 'text_domain' ),
		'edit_item'             => __( 'Edit Object', 'text_domain' ),
		'update_item'           => __( 'Update Object', 'text_domain' ),
		'view_item'             => __( 'View Object', 'text_domain' ),
		'view_items'            => __( 'View Objects', 'text_domain' ),
		'search_items'          => __( 'Search Object', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into object', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this object', 'text_domain' ),
		'items_list'            => __( 'Objects list', 'text_domain' ),
		'items_list_navigation' => __( 'Objects list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter objects list', 'text_domain' ),
	);
	$args = array(
		'label'                 => __( 'Object', 'text_domain' ),
		'description'           => __( 'Post Type Description', 'text_domain' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail' ),
		'taxonomies'            => array(),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'show_in_rest'			=> true,
		'menu_position'         => 5,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'object', $args );
}
add_action( 'init', 'custom_post_type_object', 0 );