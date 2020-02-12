<?php
/*
Plugin Name: BC Final Exam Display Shortcode & Gutenberg Block
Plugin URI: https://github.com/BellevueCollege/bc-final-exam-display
Description: Shortcode and Gutenberg block to display final exam schedules
Author: Bellevue College Integration Team
Version: 2.1 #{versionStamp}#
Author URI: http://www.bellevuecollege.edu
GitHub Plugin URI: BellevueCollege/bc-final-exam-display
Text Domain: bcfinalexam
*/

/* **********
 * Shortcode
 * **********/
function bcfinalexam_shortcode( $sc_config ) {
	$sc_config = shortcode_atts( array(
		'day1'         => '',
		'day2'         => '',
		'day3'         => '',
		'quarter'      => null,
		'first_label'  => '<strong>Daily</strong>, or <strong>Monday and Wednesday</strong>, or <strong>Monday, Wednesday and Friday</strong>, or <strong>Monday</strong> only, or <strong>Wednesday</strong> only',
		'second_label' => '<strong>Tuesday and Thursday</strong>, or <strong>Tuesday, Thursday and Friday</strong>, or <strong>Tuesday</strong> only, or <strong>Thursday</strong> only, or <strong>Friday</strong> only',
	), $sc_config, 'bcfinalexam_shortcode' );

	// Generate random string to use for anchor if quarter is not defined
	if ( null === $sc_config['quarter'] ) {
		$sc_config['quarter'] = wp_generate_password( 8, false, false );
	} else {
		$sc_config['quarter'] = sanitize_title( $sc_config['quarter'] );
	}

	// Build strings for day information
	$first_table_label  = wp_kses( $sc_config['first_label'], wp_kses_allowed_html( 'post' ) );
	$second_table_label = wp_kses( $sc_config['second_label'], wp_kses_allowed_html( 'post' ) );

	return <<<HTML
<div class="panel panel-primary">
	<div class="panel-heading">
		<h3 class="panel-title">If your class meets {$first_table_label}</h3>
	</div>
	<div class="table-responsive final-exam-table">
		<table class="table table-striped ">
			<thead>
				<tr>
					<th class="first-col">Class Time</th>
					<th class="second-col">Exam Day</th>
					<th class="third-col">Exam Time</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>6:30 a.m.</td>
					<td colspan="2"><a href="#{$sc_config['quarter']}">See note below</td>
				</tr>
				<tr>
					<td>7:30 a.m.</td>
					<td>{$sc_config['day1']}</td>
					<td>7:30-9:20 a.m.</td>
				</tr>
				<tr>
					<td>8:30 a.m.</td>
					<td>{$sc_config['day3']}</td>
					<td>7:30-9:20 a.m.</td>
				</tr>
				<tr>
					<td>9:30 a.m.</td>
					<td>{$sc_config['day1']}</td>
					<td>9:30-11:20 a.m.</td>
				</tr>
				<tr>
					<td>10:30 a.m.</td>
					<td>{$sc_config['day3']}</td>
					<td>9:30-11:20 a.m.</td>
				</tr>
				<tr>
					<td>11:30 a.m.</td>
					<td>{$sc_config['day1']}</td>
					<td>11:30 a.m.-1:20 p.m.</td>
				</tr>
				<tr>
					<td>12:30 p.m.</td>
					<td>{$sc_config['day3']}</td>
					<td>11:30 a.m.-1:20 p.m.</td>
				</tr>
				<tr>
					<td>1:30 p.m.</td>
					<td>{$sc_config['day1']}</td>
					<td>1:30-3:20 p.m.</td>
				</tr>
				<tr>
					<td>2:30 or 3 p.m.</td>
					<td>{$sc_config['day3']}</td>
					<td>1:30-3:20 p.m.</td>
				</tr>
				<tr>
					<td>3:30 p.m.</td>
					<td>{$sc_config['day1']}</td>
					<td>3:30-5:20 p.m.</td>
				</tr>
				<tr>
					<td>4:30 p.m.</td>
					<td>{$sc_config['day3']}</td>
					<td>3:30-5:20 p.m.</td>
				</tr>

			</tbody>

		</table>
	</div>
</div>

<div class="panel panel-primary">
	<div class="panel-heading">
		<h3 class="panel-title">If your class meets {$second_table_label}</h3>
	</div>
	<div class="table-responsive final-exam-table">
		<table class="table table-striped">
			<thead>
				<tr>
					<th class="first-col">Class Time</th>
					<th class="second-col">Exam Day</th>
					<th class="third-col">Exam Time</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>7:30 or 8:30 a.m.</td>
					<td>{$sc_config['day2']}</td>
					<td>7:30-9:20 a.m.</td>
				</tr>
				<tr>
					<td>9:30 or 10:30 a.m.</td>
					<td>{$sc_config['day2']}</td>
					<td>9:30-11:20 a.m.</td>
				</tr>
				<tr>
					<td>11:30 a.m. or 12:30 p.m.</td>
					<td>{$sc_config['day2']}</td>
					<td>11:30 a.m.-1:20 p.m.</td>
				</tr>
				<tr>
					<td>1:30 or 2:30 p.m.</td>
					<td>{$sc_config['day2']}</td>
					<td>1:30-3:20 p.m.</td>
				</tr>
				<tr>
					<td>3:00, 3:30 or 4:30 p.m.</td>
					<td>{$sc_config['day2']}</td>
					<td>3:30-5:20 p.m.</td>
				</tr>

			</tbody>

		</table>
	</div>
</div>
<h3 id = "{$sc_config['quarter']}">6:30 a.m. and Evening Classes at Main Campus</h3>
<p>Final exams for 6:30 a.m. and Evening credit classes at Main Campus will take place during regular class hours during finals week unless otherwise arranged with the approval of the Office of Academic Affairs.</p>
HTML;
}

add_shortcode( 'bc-final-exams', 'bcfinalexam_shortcode' );

function bcfinalexam_styles() {
	wp_register_style( 'bcfinalexam_style', plugin_dir_url( __FILE__ ) . 'css/bcfinalexam.css', '1' );
	wp_enqueue_style( 'bcfinalexam_style' );
}

add_action( 'wp_enqueue_scripts', 'bcfinalexam_styles' );

/* **********
 * Gutenberg - For Gutenberg Support
 * **********/

// Block Initializer
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
