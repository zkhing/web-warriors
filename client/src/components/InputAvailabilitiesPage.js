import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card,Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "./Heading";

const InputAvailabilitiesPage = () => {
	const [date, setDate] = useState("");
	const [fromTime, setFromTime] = useState("");
	const [toTime, setToTime] = useState("");
	const [availabilities, setAvailabilities] = useState([]);
	const location = useLocation();

	// Do something with the username
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const username = searchParams.get("username");
		// Do something with the username, e.g. display the user's name
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
									className="form-control"
									id="date"
									value={date}
									onChange={(event) => setDate(event.target.value)}
									required
								/>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group>
								<Form.Label>From</Form.Label>
								<Form.Control
									type="time"
									className="form-control"
									id="fromTime"
									value={fromTime}
									onChange={(event) => setFromTime(event.target.value)}
									required
								/>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group>
								<Form.Label>To</Form.Label>
								<Form.Control
									type="time"
									className="form-control"
									id="toTime"
									value={toTime}
									onChange={(event) => setToTime(event.target.value)}
									required
								/>
							</Form.Group>
						</Col>

						<Button type="submit" className="d-grid gap-2 col-6 mx-auto mt-3">
							Submit
						</Button>
					</Row>
				</Form>

				{/* {availabilities.length > 0 ? ( */}
				<Table className="table table-striped mt-5">
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
				{/* ) : (
					<Card.Text className="text-center my-3">
						Sorry! You have not found study-buddies yet.
					</Card.Text>
				)} */}

				<Button
					type="submit"
					className="bg-dark d-grid gap-2 col-6 mx-auto mt-3"
				>
					View Matching Students
				</Button>
			</Container>
		</>
	);
};

export default InputAvailabilitiesPage;



