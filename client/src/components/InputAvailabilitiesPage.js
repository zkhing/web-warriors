import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteAvailability from "./DeleteAvailability";
import Heading from "./Heading";
import Footer from "./Footer";


const InputAvailabilitiesPage = () => {
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [availabilities, setAvailabilities] = useState([]);
  const [username, setUsername] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get("username");
    setUsername(username); // Update the username state variable
    const savedAvailabilities = JSON.parse(localStorage.getItem(username));
    if (savedAvailabilities) {
      setAvailabilities(savedAvailabilities);
    }
  }, [location]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get("username");
    const newAvailability = { id: Date.now(), username, date, fromTime, toTime };
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

  const handleDelete = (id) => {
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get("username");
    const updatedAvailabilities = availabilities.filter((availability) => availability.id !== id);
    setAvailabilities(updatedAvailabilities);
    localStorage.setItem(username, JSON.stringify(updatedAvailabilities));
  }

  
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

			<h2 className="text-center mt-5">Welcome, {username}!</h2>
			<div className="d-flex justify-content-center align-items-center">
				<Container className="p-5 m-3" style={{ backgroundColor: "#e8e8e4" }}>
					<Form onSubmit={handleSubmit}>
						<h1 className="text-center mb-5">Your Availabilities</h1>

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
										step={1800}
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
										step={1800}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Button
							variant="outline-danger"
							className="d-grid gap-2 col-3 mx-auto m-3"
							type="submit"
						>
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
									<td className="text-center">
										{new Date(availability.date).toLocaleDateString("en-GB", {
											weekday: "short",
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</td>
									<td className="text-center">
										{new Date(
											`1970-01-01T${availability.fromTime}Z`
										).toLocaleTimeString("en-US", {
											hour12: true,
											hour: "numeric",
											minute: "numeric",
										})}
									</td>
									<td className="text-center">
										{new Date(
											`1970-01-01T${availability.toTime}Z`
										).toLocaleTimeString("en-US", {
											hour12: true,
											hour: "numeric",
											minute: "numeric",
										})}
									</td>
									<td>
										<DeleteAvailability
											availability={availability}
											onDelete={(availabilityToDelete) => {
												setAvailabilities(
													availabilities.filter(
														(availability) =>
															availability.id !== availabilityToDelete.id
													)
												);
												const searchParams = new URLSearchParams(
													location.search
												);
												const username = searchParams.get("username");
												const updatedAvailabilities = availabilities.filter(
													(availability) =>
														availability.id !== availabilityToDelete.id
												);
												localStorage.setItem(
													username,
													JSON.stringify(updatedAvailabilities)
												);
											}}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Container>
			</div>

			<div className="d-flex justify-content-center align-items-center">
				<Link
					to={`/CurrentUserMatching?username=${location.search.split("=")[1]}`}
					style={{ textDecoration: "none" }}
				>
					<Button className="d-grid gap-2 col-10 mx-auto mb-3" type="submit">
						View Matching Availabilities
					</Button>
				</Link>
				<Link to="/ViewAllAvailabilities" style={{ textDecoration: "none" }}>
					<Button className="d-grid gap-2 col-10 mx-auto mb-3" type="submit">
						View All Availabilities
					</Button>
				</Link>
			</div>

			<Footer />
		</>
	);
};

export default InputAvailabilitiesPage;