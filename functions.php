<?php

// =============================================================================
// FUNCTIONS.PHP
// -----------------------------------------------------------------------------
// Overwrite or add your own custom functions to X in this file.
// =============================================================================

// =============================================================================
// TABLE OF CONTENTS
// -----------------------------------------------------------------------------
//   01. Enqueue Parent Stylesheet
//   02. Additional Functions
// =============================================================================

// Enqueue Parent Stylesheet
// =============================================================================

add_filter( 'x_enqueue_parent_stylesheet', '__return_true' );



// Additional Functions
// =============================================================================

function my_assets() {
	if( !is_front_page() ) {
		wp_deregister_script('jquery');
		wp_enqueue_script('jq', get_stylesheet_directory_uri() . '/js/jquery-1.5.min.js');
		wp_enqueue_script('slideshow', get_stylesheet_directory_uri() . '/js/jquery.slideshow.js');
		wp_enqueue_script('main', get_stylesheet_directory_uri() . '/js/main.js');
		wp_enqueue_script('ui', get_stylesheet_directory_uri() . '/js/jquery-ui-1.8.10.custom.min.js');
		wp_enqueue_script('mousewheel', get_stylesheet_directory_uri() . '/js/jquery.mousewheel.js');
		wp_enqueue_script('custom', get_stylesheet_directory_uri() . '/js/custom.js');
		wp_enqueue_script('tabs', get_stylesheet_directory_uri() . '/js/jquery.tabs.js');
		wp_enqueue_script('work', get_stylesheet_directory_uri() . '/js/work.js');
		wp_enqueue_script('project', get_stylesheet_directory_uri() . '/js/project.js');
	}
}
add_action('wp_enqueue_scripts', 'my_assets');

// Register Custom Post Type
function create_project_post_type() {
	register_post_type('projects',
		array(
			'labels' => array(
				'name'          => __('Projects'),
				'singular_name' => __('Project')
			),
			'public' => true,
			'has_archive' => true,
		)
	);
}
add_action('init', 'create_project_post_type');