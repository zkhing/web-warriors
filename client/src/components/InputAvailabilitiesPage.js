import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const InputAvailabilitiesPage = () => {
	const [date, setDate] = useState("");
	const [fromTime, setFromTime] = useState("");
	const [toTime, setToTime] = useState("");
	const [availabilities, setAvailabilities] = useState([]);
	const location = useLocation();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const username = searchParams.get("username");
	}, [location]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const searchParams = new URLSearchParams(location.search);
		const username = searchParams.get("username");
		const newAvailability = { username, date, fromTime, toTime };
		const response = await fetch("/api/postavailabilities", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newAvailability),
		});

		if (response.ok) {
			setAvailabilities([...availabilities, newAvailability]);
			setDate("");
			setFromTime("");
			setToTime("");
		} else {
			alert("There was an error saving your availability. Please try again.");
		}
	};

	

	// Function to round a given time to the nearest 30 minutes
	const roundToNearestThirtyMinutes = (time) => {
		const [hours, minutes] = time.split(":");
		let roundedMinutes = Math.round(minutes / 30) * 30;
		if (roundedMinutes === 60) {
			roundedMinutes = "00";
			const roundedHours = parseInt(hours) + 1;
			return `${roundedHours < 10 ? "0" : ""}${roundedHours}:${roundedMinutes}`;
		} else {
			return `${hours}:${roundedMinutes < 10 ? "0" : ""}${roundedMinutes}`;
		}
	};

	// Event handler to update fromTime state with a rounded value
	const handleFromTimeChange = (event) => {
		const roundedValue = roundToNearestThirtyMinutes(event.target.value);
		setFromTime(roundedValue);
	};

	// Event handler to update toTime state with a rounded value
const handleToTimeChange = (event) => {
	const roundedValue = roundToNearestThirtyMinutes(event.target.value);
	if (roundedValue < fromTime) {
		setToTime(fromTime);
	} else {
		setToTime(roundedValue);
	}
};

	return (
		<>
			<Container className="bg-secondary p-5 my-5 container-2">
				<Form onSubmit={handleSubmit}>
					<Card.Title className="text-center my-3">
						User Input Availabilities
					</Card.Title>

					<Row>
						<Col>
							<Form.Group controlId="formDate">
								<Form.Label>Date</Form.Label>
								
								<Form.Control
type="date"
value={date}
onChange={(e) => setDate(e.target.value)}
required
/>
</Form.Group>
</Col>
<Col>
<Form.Group controlId="formFromTime">
<Form.Label>From</Form.Label>
<Form.Control
type="time"
value={fromTime}
onChange={handleFromTimeChange}
required
/>
</Form.Group>
</Col>
<Col>
<Form.Group controlId="formToTime">
<Form.Label>To</Form.Label>
<Form.Control
type="time"
value={toTime}
onChange={handleToTimeChange}
required
/>
</Form.Group>
</Col>
</Row>
<Button type="submit">Submit</Button>
			</Form>

			<Card.Title className="text-center my-3">
				Available Times
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
					{availabilities.map((availability, index) => (
						<tr key={index}>
							<td>{availability.date}</td>
							<td>{availability.fromTime}</td>
							<td>{availability.toTime}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	</>
);
};

export default InputAvailabilitiesPage;