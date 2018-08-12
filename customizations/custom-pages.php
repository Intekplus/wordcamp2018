<?php 
function get_all_cpts() {
	$args = array(
		'public'   => true,
		'_builtin' => false
	);
	
	$output = 'names'; // names or objects, note names is the default
	$operator = 'and'; // 'and' or 'or'
	
	return get_post_types( $args, $output ); 
}

function add_menu_pages() {
	$post_types = get_all_cpts();
	foreach ( $post_types  as $post_type ) {
		add_menu_page( $post_type, __( $post_type, 'ad-theme'), 'manage_options', $post_type, 'render_ctp_page' );
	}
}
add_action('admin_menu', 'add_menu_pages'); 
 
function render_ctp_page(){ 
  echo '<div id="root"></div>'; 
} 