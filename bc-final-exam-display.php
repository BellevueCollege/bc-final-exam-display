<?php
/*
Plugin Name: BC Final Exam Display Shortcode & Gutenberg Block
Plugin URI: https://github.com/BellevueCollege/bc-final-exam-display
Description: Shortcode and Gutenberg block to display final exam schedules
Author: Bellevue College Integration Team
Version: 3.1.1 #{versionStamp}#
Author URI: http://www.bellevuecollege.edu
GitHub Plugin URI: BellevueCollege/bc-final-exam-display
Text Domain: bc-final-exam-display
*/

add_action( 'init', 'bc_final_exam_display_block' );
function bc_final_exam_display_block() {
	register_block_type( dirname(__FILE__) . '/build/block.json' );
}

