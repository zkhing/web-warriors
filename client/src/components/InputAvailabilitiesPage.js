import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteAvailability from "./DeleteAvailability";
import Heading from "./Heading";
import ViewMatchingStudents from "./ViewMatchingStudents";

const InputAvailabilitiesPage = () => {
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [availabilities, setAvailabilities] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get("username");
    const savedAvailabilities = JSON.parse(localStorage.getItem(username));
    if (savedAvailabilities) {
      setAvailabilities(savedAvailabilities);
    }
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
      localStorage.setItem(username, JSON.stringify([...availabilities, newAvailability]));
    } else {
      alert("There was an error saving your availability. Please try again.");
    }
  };

  // Function to round a given time to the nearest 30 minutes
  const roundToNearestThirtyMinutes = (time) => {
    const [hours, minutes] = time.split(":");
    const roundedMinutes = Math.round(minutes / 30) * 30;
    const roundedHours = roundedMinutes === 60 ? parseInt(hours) + 1 : parseInt(hours);
    return `${roundedHours < 10 ? "0" : ""}${roundedHours}:${roundedMinutes === 0 ? "00" : "30"}`;
  };

  // Event handler to update fromTime state with a rounded value
  const handleFromTimeChange = (event) => {
    const hours = event.target.value.split(":")[0];
    const minutes = Math.floor(event.target.value.split(":")[1] / 30) * 30;
    const roundedValue = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    setFromTime(roundedValue);
  };
  // Event handler to update toTime state with a rounded value
  const handleToTimeChange = (event) => {
	const hours = event.target.value.split(":")[0];
	const minutes = Math.floor(event.target.value.split(":")[1] / 30) * 30;
	const roundedValue = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
	if (roundedValue < fromTime) {
	  setToTime(fromTime);
	} else {
	  setToTime(roundedValue);
	}
  };
  

	return (
		<>
			<Heading />
			<Container className="bg-secondary p-5 my-5 container-2">
				<Form onSubmit={handleSubmit}>
					<Card.Title className="text-center my-3">
						Your Availabilities
					</Card.Title>

					<Row>
						<Col>
							<Form.Group controlId="formDate">
								<Form.Label>Date</Form.Label>

								<Form.Control
									type="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
									min={new Date().toISOString().split("T")[0]}
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
									step={1800} // set step to 1800 seconds (30 minutes)
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
									step={1800} // set step to 1800 seconds (30 minutes)
								/>
							</Form.Group>
						</Col>
					</Row>
					<Button className="d-grid gap-2 col-3 mx-auto m-3" type="submit">
						Submit
					</Button>
				</Form>

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
								<td>
									<DeleteAvailability
										availability={availability}
										onDelete={(availabilityToDelete) =>
											setAvailabilities(
												availabilities.filter(
													(availability) =>
														availability !== availabilityToDelete
												)
											)
										}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</Table>

				<Link path="/view" element={<ViewMatchingStudents />}>
					<Button
						className="bg-dark d-grid gap-2 col-6 mx-auto m-3"
						type="submit"
					>
						To View Matching Students
					</Button>
				</Link>
        
			</Container>
		</>
	);
};

export default InputAvailabilitiesPage;