
import {
	RichText,
} from '@wordpress/block-editor';

const dateFormat = require('dateformat'); //import dateFormat to format dates

const { __ } = wp.i18n; // Import __() from wp.i18n

const deprecated = [
	{
		attributes: {
			day1: {
				type: 'string',
				default: ''
			},
			day2: {
				type: 'string',
				default: ''
			},
			day3: {
				type: 'string',
				default: ''
			},
			first_label: {
				type: 'string',
				default: '<span>If your class meets <strong>Daily</strong>, or <strong>Monday and Wednesday</strong>, or <strong>Monday, Wednesday and Friday</strong>, or <strong>Monday</strong> only, or <strong>Wednesday</strong> only</span>'
			},
			second_label: {
				type: 'string',
				default: '<span>If your class meets <strong>Tuesday and Thursday</strong>, or <strong>Tuesday, Thursday and Friday</strong>, or <strong>Tuesday</strong> only, or <strong>Thursday</strong> only, or <strong>Friday</strong> only</span>'
			},
			quarter: {
				type: 'string',
				default: 'spring'
			}
		},
		save: function( props ) {
			const { attributes: { day1, day2, day3, first_label, second_label, quarter } } = props;

			const day1Formatted = dateFormat(day1,"dddd, m/d");
			const day2Formatted = dateFormat(day2,"dddd, m/d");
			const day3Formatted = dateFormat(day3,"dddd, m/d");

			return (
				<div>
					<div class="panel panel-primary">
						<div class="panel-heading">
							<RichText.Content
								tagName="h3"
								className="panel-title"
								value={first_label}
							/>
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
										<td>2:30 or 3:00 p.m.</td>
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
							<RichText.Content
								tagName="h3"
								className="panel-title"
								value={second_label}
							/>
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
					<p>Final exams for 6:30 a.m. and Evening credit classes (i.e. start time of 5:00 p.m. or later) at Main Campus will take place during regular class hours during finals week unless otherwise arranged with the approval of the Office of Academic Affairs.</p>

				</div>
			);
		},
	},
	{
		attributes: {
			day1: {
				type: 'string',
				default: ''
			},
			day2: {
				type: 'string',
				default: ''
			},
			day3: {
				type: 'string',
				default: ''
			},
			first_label: {
				type: 'string',
				default: '<span>If your class meets <strong>Daily</strong>, or <strong>Monday and Wednesday</strong>, or <strong>Monday, Wednesday and Friday</strong>, or <strong>Monday</strong> only, or <strong>Wednesday</strong> only</span>'
			},
			second_label: {
				type: 'string',
				default: '<span>If your class meets <strong>Tuesday and Thursday</strong>, or <strong>Tuesday, Thursday and Friday</strong>, or <strong>Tuesday</strong> only, or <strong>Thursday</strong> only, or <strong>Friday</strong> only</span>'
			},
			quarter: {
				type: 'string',
				default: 'spring'
			}
		},
		save: function( props ) {
			const { attributes: { day1, day2, day3, first_label, second_label, quarter } } = props;

			const day1Formatted = dateFormat(day1,"dddd, m/d");
			const day2Formatted = dateFormat(day2,"dddd, m/d");
			const day3Formatted = dateFormat(day3,"dddd, m/d");

			return (
				<div>
					<div class="panel panel-primary">
						<div class="panel-heading">
							<RichText.Content
								tagName="h3"
								className="panel-title"
								value={first_label}
							/>
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
							<RichText.Content
								tagName="h3"
								className="panel-title"
								value={second_label}
							/>
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
					<p>Final exams for 6:30 a.m. and Evening credit classes at Main Campus will take place during regular class hours during finals week unless otherwise arranged with the approval of the Office of Academic Affairs.</p>

				</div>
			);
		}
	}
]
export default deprecated;
