const {
	Button,
	DatePicker,
	PanelBody,
	SelectControl,
} = wp.components;

import {
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
const dateFormat = require('dateformat'); //import dateFormat to format dates

export default function save( props ) {
	const { attributes: { day1, day2, day3, first_label, second_label, quarter, quarter_year } } = props;
	const blockProps = useBlockProps.save();

	const day1Formatted = dateFormat( day1, 'dddd, m/d' );
	const day2Formatted = dateFormat( day2, 'dddd, m/d' );
	const day3Formatted = dateFormat( day3, 'dddd, m/d' );

	return (
		<div { ...blockProps }>
			<div className="card mb-3 text-white bg-primary">
				<RichText.Content
					tagName="h3"
					className="card-header"
					value={ first_label }
				/>
				<div className="table-responsive card-table bg-light text-dark">
					<table className="card-table table table-striped">
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
								<td colspan="2"><a href={'#' + quarter + quarter_year}>See note below</a></td>
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

			<div className="card mb-3 text-white bg-primary">
				<RichText.Content
					tagName="h3"
					className="card-header"
					value={second_label}
				/>
				<div className="table-responsive card-table bg-light text-dark">
					<table className="card-table table table-striped">
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

			<h3 id={quarter + quarter_year}>6:30 a.m. and Evening Classes at Main Campus</h3>
			<p>Final exams for 6:30 a.m. and Evening credit classes (i.e. start time of 5:00 p.m. or later) at Main Campus will take place during regular class hours during finals week unless otherwise arranged with the approval of the Academic Affairs Office.</p>

		</div>
	);
}
