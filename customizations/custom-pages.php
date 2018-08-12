<?php 
 
function add_menu_pages() { 
    add_menu_page( 'item', __( 'item', 'ad-theme'), 'manage_options', 'item', 'render_ctp_page' ); 
} 
add_action('admin_menu', 'add_menu_pages'); 
 
function render_ctp_page(){ 
  echo '<div id="root"></div>'; 
} 