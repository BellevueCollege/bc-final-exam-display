/**
 * BLOCK: bc-final-exam-display
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import CSS.
import './style.scss';
import './editor.scss';

// Import Components
const {
	InspectorControls,
} = wp.editor;

const {
	Button,
	DatePicker,
	PanelBody,
	SelectControl,
	TextareaControl,
} = wp.components;

const dateFormat = require('dateformat'); //import dateFormat to format dates

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'bcfed/block-bc-final-exam-display', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'BC Final Exam Display' ), // Block title.
	icon: 'welcome-learn-more', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'bc-final-exam-display' ),
	],
	
	// Name attributes to manage the state of data
	attributes: {
		day1: {
			type: 'string',
		},
		day2: {
			type: 'string'
		},
		day3: {
			type: 'string'
		},
		first_label: {
			type: 'string',
			default: '<strong>Daily</strong>, or <strong>Monday and Wednesday</strong>, or <strong>Monday, Wednesday and Friday</strong>, or <strong>Monday</strong> only, or <strong>Wednesday</strong> only'
		},
		second_label: {
			type: 'string',
			default: '<strong>Tuesday and Thursday</strong>, or <strong>Tuesday, Thursday and Friday</strong>, or <strong>Tuesday</strong> only, or <strong>Thursday</strong> only, or <strong>Friday</strong> only'
		},
		quarter: {
			type: 'string',
			default: 'spring'
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const { attributes: { day1, day2, day3, first_label, second_label, quarter }, setAttributes } = props;
		const resetLabelsToDefault = ( ) => {
			setAttributes( { first_label: '<strong>Daily</strong>, or <strong>Monday and Wednesday</strong>, or <strong>Monday, Wednesday and Friday</strong>, or <strong>Monday</strong> only, or <strong>Wednesday</strong> only' } );
			setAttributes( { second_label: '<strong>Tuesday and Thursday</strong>, or <strong>Tuesday, Thursday and Friday</strong>, or <strong>Tuesday</strong> only, or <strong>Thursday</strong> only, or <strong>Friday</strong> only' } );
		}
	
		const day1Formatted = dateFormat(day1,"dddd, m/d");
		const day2Formatted = dateFormat(day2,"dddd, m/d");
		const day3Formatted = dateFormat(day3,"dddd, m/d");

		return [
				<InspectorControls key = "inspector">
					<PanelBody title = { __( 'Change Quarter' ) } >
						<SelectControl
							label = "Select Quarter"
							value = { quarter }
							options = { [
								{ label: 'Spring', value: 'spring' },
								{ label: 'Summer', value: 'summer' },
								{ label: 'Fall', value: 'fall' },
								{ label: 'Winter', value: 'winter' }
							] }
							onChange = { ( newQuarter ) => { setAttributes( { quarter: newQuarter } ); } }
						/>
					</PanelBody>
					<PanelBody title = { __( 'Change Final Exam Day One' ) } >
						<DatePicker
							currentDate = { day1 }
							onChange = { ( newDate ) => {
								setAttributes( { day1: newDate } );
							} }
						/>
					</PanelBody>
					<PanelBody title = { __( 'Change Final Exam Day Two' ) } >
						<DatePicker
							currentDate = { day2 }
							onChange = { ( newDate ) => {
								setAttributes( { day2: newDate } );
							} }
						/>
					</PanelBody>
					<PanelBody title = { __( 'Change Final Exam Day Three' ) } >
						<DatePicker
							currentDate = { day3 }
							onChange = { ( newDate ) => {
								setAttributes( { day3: newDate } );
							} }
						/>
					</PanelBody>
					<PanelBody title = { __( 'Change Table Labels' ) } >
						<TextareaControl
							label = "First Label"
							value = { first_label }
							onChange = { ( newText ) => {
								setAttributes( { first_label: newText } );
							} }
						/>
						<TextareaControl
							label = "Second Label"
							value = { second_label }
							onChange = { ( newText ) => {
								setAttributes( { second_label: newText } );
							} }
						/>
						<Button 
							isDefault 
							onClick = { resetLabelsToDefault }>
							Reset to Default
						</Button>
					</PanelBody>
				</InspectorControls>
			,
			// Creates a <p class='wp-block-bcfed-block-bc-final-exam-display'></p>.
			<div className={ props.className }>

				<div class="final-exam-help-box">
					<h3>BC Final Exam Display</h3>
					<p>Choose the dates for the final exams via the settings on the right, or by clicking the gear icon and selecting the block.</p>
					<p>Calendar day 1 is: <span class="final-exam-day">{ day1Formatted ? day1Formatted : 'No Calendar Date Chosen' }</span></p>
					<p>Calendar day 2 is: <span class="final-exam-day">{ day2Formatted ? day2Formatted : 'No Calendar Date Chosen' }</span></p>
					<p>Calendar day 3 is: <span class="final-exam-day">{ day3Formatted ? day3Formatted : 'No Calendar Date Chosen' }</span></p>
					<p><span class="final-exam-info">!</span>This message will not appear on the site.</p>
				</div>

				<div class="panel panel-primary">
					<div class="panel-heading">
						<h3 class="panel-title">If your class meets <span dangerouslySetInnerHTML={{__html: first_label }}></span></h3>
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
									<td colspan="2"><a href={'#' + quarter}>See note below</a></td>
								</tr>
								<tr>
									<td>7:30 a.m.</td>
									<td>{day1Formatted}</td>
									<td>7:30-9:20 a.m.</td>
								</tr>
								<tr>
									<td>8:30 a.m.</td>
									<td>{day3Formatted}</td>
									<td>7:30-9:20 a.m.</td>
								</tr>
								<tr>
									<td>9:30 a.m.</td>
									<td>{day1Formatted}</td>
									<td>9:30-11:20 a.m.</td>
								</tr>
								<tr>
									<td>10:30 a.m.</td>
									<td>{day3Formatted}</td>
									<td>9:30-11:20 a.m.</td>
								</tr>
								<tr>
									<td>11:30 a.m.</td>
									<td>{day1Formatted}</td>
									<td>11:30 a.m.-1:20 p.m.</td>
								</tr>
								<tr>
									<td>12:30 p.m.</td>
									<td>{day3Formatted}</td>
									<td>11:30 a.m.-1:20 p.m.</td>
								</tr>
								<tr>
									<td>1:30 p.m.</td>
									<td>{day1Formatted}</td>
									<td>1:30-3:20 p.m.</td>
								</tr>
								<tr>
									<td>2:30 or 3 p.m.</td>
									<td>{day3Formatted}</td>
									<td>1:30-3:20 p.m.</td>
								</tr>
								<tr>
									<td>3:30 p.m.</td>
									<td>{day1Formatted}</td>
									<td>3:30-5:20 p.m.</td>
								</tr>
								<tr>
									<td>4:30 p.m.</td>
									<td>{day3Formatted}</td>
									<td>3:30-5:20 p.m.</td>
								</tr>

							</tbody>

						</table>
					</div>
				</div> {/*end panel panel-primary */} 

				<div class="panel panel-primary">
					<div class="panel-heading">
						<h3 class="panel-title">If your class meets <span dangerouslySetInnerHTML={{__html: second_label }}></span></h3>
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
									<td>{day2Formatted}</td>
									<td>7:30-9:20 a.m.</td>
								</tr>
								<tr>
									<td>9:30 or 10:30 a.m.</td>
									<td>{day2Formatted}</td>
									<td>9:30-11:20 a.m.</td>
								</tr>
								<tr>
									<td>11:30 a.m. or 12:30 p.m.</td>
									<td>{day2Formatted}</td>
									<td>11:30 a.m.-1:20 p.m.</td>
								</tr>
								<tr>
									<td>1:30 or 2:30 p.m.</td>
									<td>{day2Formatted}</td>
									<td>1:30-3:20 p.m.</td>
								</tr>
								<tr>
									<td>3:00, 3:30 or 4:30 p.m.</td>
									<td>{day2Formatted}</td>
									<td>3:30-5:20 p.m.</td>
								</tr>

							</tbody>

						</table>
					</div>
				</div> {/*end panel panel-primary */} 

				<h3 id={quarter}>6:30 a.m. and Evening Classes at Main Campus</h3>
				<p>Final exams for 6:30 a.m. and Evening credit classes at Main Campus will take place during regular class hours during finals week unless otherwise arranged with the approval of the Office of Instruction.</p>

			</div>// end wp-block-bcfed-block-bc-final-exam-display
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const { attributes: { day1, day2, day3, first_label, second_label, quarter } } = props;
		const day1Formatted = dateFormat(day1,"dddd, m/d");
		const day2Formatted = dateFormat(day2,"dddd, m/d");
		const day3Formatted = dateFormat(day3,"dddd, m/d");

        return (
            <div>
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h3 class="panel-title">If your class meets <span dangerouslySetInnerHTML={{__html: first_label }}></span></h3>
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
									<td colspan="2"><a href={'#' + quarter}>See note below</a></td>
								</tr>
								<tr>
									<td>7:30 a.m.</td>
									<td>{day1Formatted}</td>
									<td>7:30-9:20 a.m.</td>
								</tr>
								<tr>
									<td>8:30 a.m.</td>
									<td>{day3Formatted}</td>
									<td>7:30-9:20 a.m.</td>
								</tr>
								<tr>
									<td>9:30 a.m.</td>
									<td>{day1Formatted}</td>
									<td>9:30-11:20 a.m.</td>
								</tr>
								<tr>
									<td>10:30 a.m.</td>
									<td>{day3Formatted}</td>
									<td>9:30-11:20 a.m.</td>
								</tr>
								<tr>
									<td>11:30 a.m.</td>
									<td>{day1Formatted}</td>
									<td>11:30 a.m.-1:20 p.m.</td>
								</tr>
								<tr>
									<td>12:30 p.m.</td>
									<td>{day3Formatted}</td>
									<td>11:30 a.m.-1:20 p.m.</td>
								</tr>
								<tr>
									<td>1:30 p.m.</td>
									<td>{day1Formatted}</td>
									<td>1:30-3:20 p.m.</td>
								</tr>
								<tr>
									<td>2:30 or 3 p.m.</td>
									<td>{day3Formatted}</td>
									<td>1:30-3:20 p.m.</td>
								</tr>
								<tr>
									<td>3:30 p.m.</td>
									<td>{day1Formatted}</td>
									<td>3:30-5:20 p.m.</td>
								</tr>
								<tr>
									<td>4:30 p.m.</td>
									<td>{day3Formatted}</td>
									<td>3:30-5:20 p.m.</td>
								</tr>

							</tbody>

						</table>
					</div>
				</div> {/*end panel panel-primary */} 

				<div class="panel panel-primary">
					<div class="panel-heading">
					<h3 class="panel-title">If your class meets <span dangerouslySetInnerHTML={{__html: second_label }}></span></h3>
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
									<td>{day2Formatted}</td>
									<td>7:30-9:20 a.m.</td>
								</tr>
								<tr>
									<td>9:30 or 10:30 a.m.</td>
									<td>{day2Formatted}</td>
									<td>9:30-11:20 a.m.</td>
								</tr>
								<tr>
									<td>11:30 a.m. or 12:30 p.m.</td>
									<td>{day2Formatted}</td>
									<td>11:30 a.m.-1:20 p.m.</td>
								</tr>
								<tr>
									<td>1:30 or 2:30 p.m.</td>
									<td>{day2Formatted}</td>
									<td>1:30-3:20 p.m.</td>
								</tr>
								<tr>
									<td>3:00, 3:30 or 4:30 p.m.</td>
									<td>{day2Formatted}</td>
									<td>3:30-5:20 p.m.</td>
								</tr>

							</tbody>

						</table>
					</div>
				</div> {/*end panel panel-primary */} 

				<h3 id={quarter}>6:30 a.m. and Evening Classes at Main Campus</h3>
				<p>Final exams for 6:30 a.m. and Evening credit classes at Main Campus will take place during regular class hours during finals week unless otherwise arranged with the approval of the Office of Instruction.</p>
        
			</div>
        );
	},
} );
