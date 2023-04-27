<?php
/*
Plugin Name: BC Final Exam Display Shortcode & Gutenberg Block
Plugin URI: https://github.com/BellevueCollege/bc-final-exam-display
Description: Shortcode and Gutenberg block to display final exam schedules
Author: Bellevue College Integration Team
Version: 3.0.0 #{versionStamp}#
Author URI: http://www.bellevuecollege.edu
GitHub Plugin URI: BellevueCollege/bc-final-exam-display
Text Domain: bc-final-exam-display
*/



// add_action("enqueue_block_editor_assets", "bc_final_exam_display_scripts");
// function bc_final_exam_display_scripts() {
// 	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

// 	wp_register_script(
// 		'bc-final-exam-display',
// 		plugins_url( 'build/index.js', __FILE__ ),
// 		$asset_file['dependencies'],
// 		$asset_file['version']
// 	);
// 	wp_enqueue_script('bc-final-exam-display');

// }

add_action( 'init', 'bc_final_exam_display_block' );
function bc_final_exam_display_block() {
	register_block_type( dirname(__FILE__) . '/build/block.json' );
}

