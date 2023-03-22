import { Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewMatchingStudents() {
	// const [availabilities, setAvailabilities] = useState([]);

	return (
		<>
			<Card.Title className="text-center my-3">
				View Matching Students
			</Card.Title>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Date</th>
						<th>From</th>
						<th>To</th>
					</tr>
				</thead>
				<tbody>
					{/* {availabilities.map((availability, index) => (
<tr key={index}>
<td>{availability.date}</td>
<td>{availability.fromTime}</td>
<td>{availability.toTime}</td>
</tr>
))} */}
				</tbody>
			</Table>
		</>
	);
}

export default ViewMatchingStudents;
