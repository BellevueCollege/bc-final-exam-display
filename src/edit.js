const {
	Button,
	DatePicker,
	PanelBody,
	SelectControl,
} = wp.components;

import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';

const dateFormat = require('dateformat'); //import dateFormat to format dates

const { __ } = wp.i18n; // Import __() from wp.i18n

import './editor.scss';
import './style.scss';


export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: { day1, day2, day3, first_label, second_label, quarter, quarter_year }, setAttributes } = props;

	const resetFirstLabelToDefault = ( ) => {
		setAttributes( { first_label: (<span>If your class meets <strong>Daily</strong>, or <strong>Monday and Wednesday</strong>, or <strong>Monday, Wednesday and Friday</strong>, or <strong>Monday</strong> only, or <strong>Wednesday</strong> only</span>) } );
	}
	const resetSecondLabelToDefault = ( ) => {
		setAttributes( { second_label: (<span>If your class meets <strong>Tuesday and Thursday</strong>, or <strong>Tuesday, Thursday and Friday</strong>, or <strong>Tuesday</strong> only, or <strong>Thursday</strong> only, or <strong>Friday</strong> only</span>) } );
	}

	const setYear = ( old_date, year ) => {
		let new_date = new Date( old_date );
		new_date.setFullYear( year );
		return new_date;
	}

	//If day is not blank, then output formatted date; if date is blank, then output '[no date selected]'
	const day1Formatted = (day1 != '' ? dateFormat(day1,"dddd, m/d") : '[no date selected]');
	const day2Formatted = (day2 != '' ? dateFormat(day2,"dddd, m/d") : '[no date selected]');
	const day3Formatted = (day3 != '' ? dateFormat(day3,"dddd, m/d") : '[no date selected]');

	let helpBox;
	if ( props.isSelected ) {
		helpBox = (
			<span><div className="final-exam-help-box">
				<h3>BC Final Exam Display</h3>
				<p>Choose the dates for the final exams via the settings on the right, or by clicking the gear icon and selecting the block.</p>
				<p>Calendar day 1 is: <span className="final-exam-day">{ day1Formatted }</span></p>
				<p>Calendar day 2 is: <span className="final-exam-day">{ day2Formatted }</span></p>
				<p>Calendar day 3 is: <span className="final-exam-day">{ day3Formatted }</span></p>
				<p><span className="final-exam-info">!</span>This message will not appear on the site.</p>
			</div></span>
		);
	}

	return [
		<InspectorControls key = "inspector">
			<PanelBody title = { __( 'Change Quarter' ) }>
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
				<SelectControl
					label = "Select Year"
					value = { quarter_year }
					options = { [
						{ label: '2020', value: '2020' },
						{ label: '2021', value: '2021' },
						{ label: '2022', value: '2022' },
						{ label: '2023', value: '2023' },
						{ label: '2024', value: '2024' },
						{ label: '2025', value: '2025' },
						{ label: '2026', value: '2026' },
						{ label: '2027', value: '2027' },
						{ label: '2028', value: '2028' },
						{ label: '2029', value: '2029' },
						{ label: '2030', value: '2030' },
						{ label: '2031', value: '2031' },
						{ label: '2032', value: '2032' },
						{ label: '2033', value: '2033' },
						{ label: '2034', value: '2034' },
						{ label: '2035', value: '2035' },
						{ label: '2036', value: '2036' },
						{ label: '2037', value: '2037' },
						{ label: '2038', value: '2038' },
						{ label: '2039', value: '2039' },
						{ label: '2040', value: '2040' }
					] }
					onChange = { ( newQuarterYear ) => {
						setAttributes( { quarter_year: newQuarterYear } );

						// Set the year of datepickers to the new quarter year
						const day1_new = setYear( day1, newQuarterYear );
						const day2_new = setYear( day2, newQuarterYear );
						const day3_new = setYear( day3, newQuarterYear );
						setAttributes( { day1: day1_new, day2: day2_new, day3: day3_new } );
					} }
				/>
			</PanelBody>
			<PanelBody title = { __( 'Change Final Exam Day One' ) } >
				<div>
					<p>Note: Changing the month on Day 1 will also change the month on Day 2 and 3.</p>
				</div>
				<DatePicker
					currentDate = { day1 }
					onChange = { ( newDate ) => {
						// If the month changes, update the month on all of the other datepickers
						const month = new Date(newDate).getMonth();
						const day2_new = new Date(day2).setMonth(month);
						const day3_new = new Date(day3).setMonth(month);
						setAttributes( { day1: newDate, day2: day2_new, day3: day3_new } );
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
			<PanelBody title = { __( 'Reset Table Labels' ) } >
				<p>
					<Button
						isDefault
						onClick = { resetFirstLabelToDefault }>
						Reset First Label to Default
					</Button>
				</p>
				<p>
					<Button
						isDefault
						onClick = { resetSecondLabelToDefault }>
						Reset Second Label to Default
					</Button>
				</p>
			</PanelBody>
		</InspectorControls>,

		// Creates a <p class='wp-block-bcfed-block-bc-final-exam-display'></p>.
		<div { ...blockProps } key="1">

			{ helpBox }

			<div className="card mb-3 text-white bg-primary mw-100 p-0">
				<RichText
					tagName="h3"
					className="card-heading px-3 py-2 mb-0"
					onChange={ ( newContent ) => { setAttributes( { first_label: newContent } ) } }
					value={ first_label }
				/>
				<div className="table-responsive final-exam-table card-table bg-light text-dark">
					<table className="table table-striped ">
						<thead>
							<tr>
								<th className="first-col">Class Time</th>
								<th className="second-col">Exam Day</th>
								<th className="third-col">Exam Time</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>6:30 a.m.</td>
								<td colspan="2"><a href={'#' + quarter}>See note below</a></td>
							</tr>
							<tr>
								<td>7:30 a.m.</td>
								<td>{ day1Formatted }</td>
								<td>7:30-9:20 a.m.</td>
							</tr>
							<tr>
								<td>8:30 a.m.</td>
								<td>{ day3Formatted }</td>
								<td>7:30-9:20 a.m.</td>
							</tr>
							<tr>
								<td>9:30 a.m.</td>
								<td>{ day1Formatted }</td>
								<td>9:30-11:20 a.m.</td>
							</tr>
							<tr>
								<td>10:30 a.m.</td>
								<td>{ day3Formatted }</td>
								<td>9:30-11:20 a.m.</td>
							</tr>
							<tr>
								<td>11:30 a.m.</td>
								<td>{ day1Formatted }</td>
								<td>11:30 a.m.-1:20 p.m.</td>
							</tr>
							<tr>
								<td>12:30 p.m.</td>
								<td>{ day3Formatted }</td>
								<td>11:30 a.m.-1:20 p.m.</td>
							</tr>
							<tr>
								<td>1:30 p.m.</td>
								<td>{ day1Formatted }</td>
								<td>1:30-3:20 p.m.</td>
							</tr>
							<tr>
								<td>2:30 or 3:00 p.m.</td>
								<td>{ day3Formatted }</td>
								<td>1:30-3:20 p.m.</td>
							</tr>
							<tr>
								<td>3:30 p.m.</td>
								<td>{ day1Formatted }</td>
								<td>3:30-5:20 p.m.</td>
							</tr>
							<tr>
								<td>4:30 p.m.</td>
								<td>{ day3Formatted }</td>
								<td>3:30-5:20 p.m.</td>
							</tr>

						</tbody>

					</table>
				</div>
			</div> {/*end panel panel-primary */}

			<div className="card mb-3 text-white bg-primary mw-100 p-0">
				<RichText
					tagName="h3"
					className="panel-title px-3 py-2 mb-0"
					onChange = { (newContent) => { setAttributes({second_label: newContent})} }
					value={second_label}
				/>
				<div className="table-responsive final-exam-table card-table bg-light text-dark">
					<table className="table table-striped ">
						<thead>
							<tr>
								<th className="first-col">Class Time</th>
								<th className="second-col">Exam Day</th>
								<th className="third-col">Exam Time</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>7:30 or 8:30 a.m.</td>
								<td>{ day2Formatted }</td>
								<td>7:30-9:20 a.m.</td>
							</tr>
							<tr>
								<td>9:30 or 10:30 a.m.</td>
								<td>{ day2Formatted }</td>
								<td>9:30-11:20 a.m.</td>
							</tr>
							<tr>
								<td>11:30 a.m. or 12:30 p.m.</td>
								<td>{ day2Formatted }</td>
								<td>11:30 a.m.-1:20 p.m.</td>
							</tr>
							<tr>
								<td>1:30 or 2:30 p.m.</td>
								<td>{ day2Formatted }</td>
								<td>1:30-3:20 p.m.</td>
							</tr>
							<tr>
								<td>3:00, 3:30 or 4:30 p.m.</td>
								<td>{ day2Formatted }</td>
								<td>3:30-5:20 p.m.</td>
							</tr>

						</tbody>

					</table>
				</div>
			</div> {/*end panel panel-primary */}

			<h3 id={ quarter }>6:30 a.m. and Evening Classes at Main Campus</h3>
			<p>Final exams for 6:30 a.m. and Evening credit classes (i.e. start time of 5:00 p.m. or later) at Main Campus will take place during regular class hours during finals week unless otherwise arranged with the approval of the Academic Affairs Office.</p>

		</div>, // end wp-block-bcfed-block-bc-final-exam-display
	];
}
