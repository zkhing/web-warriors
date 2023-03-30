import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteAvailability from "./DeleteAvailability";
import Heading from "./Heading";
import Footer from "./Footer";
import "./Input.css";

const InputAvailabilitiesPage = () => {
	const [date, setDate] = useState("");
	const [fromTime, setFromTime] = useState("");
	const [toTime, setToTime] = useState("");
	const [availabilities, setAvailabilities] = useState([]);
	const [username, setUsername] = useState("");
	const location = useLocation();

	const [uploadedImage, setUploadedImage] = useState(null);


	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const usernameFromParams = searchParams.get("username");
		setUsername(usernameFromParams);
		const storedAvailabilities = localStorage.getItem(usernameFromParams);
		if (storedAvailabilities) {
			setAvailabilities(JSON.parse(storedAvailabilities));
		}
		const savedImage = localStorage.getItem(
			`${usernameFromParams}_uploadedImage`
		);
		if (savedImage) {
			setUploadedImage(savedImage);
		}
	}, [location]);

	const handleDrop = (event) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		const imageUrl = URL.createObjectURL(file);
		setUploadedImage(imageUrl);
		// Store the image URL in local storage for the current user
		localStorage.setItem(`${username}_uploadedImage`, imageUrl);
	};
	const handleRemoveImage = () => {
		// Remove the image from the local storage
		localStorage.removeItem(`${username}_uploadedImage`);
		// Clear the uploadedImage state
		setUploadedImage(null);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const searchParams = new URLSearchParams(location.search);
		const username = searchParams.get("username");
		const newAvailability = {
			id: Date.now(),
			username,
			date,
			fromTime,
			toTime,
		};
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
			localStorage.setItem(
				username,
				JSON.stringify([...availabilities, newAvailability])
			);
		} else {
			alert("There was an error saving your availability. Please try again.");
		}
	};

	const handleDelete = (id) => {
		const searchParams = new URLSearchParams(location.search);
		const username = searchParams.get("username");
		const updatedAvailabilities = availabilities.filter(
			(availability) => availability.id !== id
		);
		setAvailabilities(updatedAvailabilities);
		localStorage.setItem(username, JSON.stringify(updatedAvailabilities));
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
			<Row>
				<Col xs={3} className="d-flex justify-content-center m-5 pl-5">
					<div>
						<h2>Welcome, {username}!</h2>
						<Col
							lg={3}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
							}}
						>
							<div
								className="dropzone"
								onDragOver={(e) => e.preventDefault()}
								onDragEnter={(e) => e.preventDefault()}
								onDrop={handleDrop}
								onClick={() => {
									document.getElementById("fileInput").click();
								}}
							>
								{!uploadedImage &&
									"Drag 'n' drop your profile image here, or click to select a file"}
								<input
									id="fileInput"
									type="file"
									accept="image/*"
									onChange={(e) => {
										const imageFile = e.target.files[0];
										const reader = new FileReader();
										reader.onload = () => {
											const imageUrl = reader.result;
											setUploadedImage(imageUrl);
											const usernameFromParams = getUsername();
											localStorage.setItem(
												`${usernameFromParams}_uploadedImage`,
												imageUrl
											);
										};
										reader.readAsDataURL(imageFile);
									}}
									style={{ display: "none" }}
								/>
								{uploadedImage && (
									<img
										src={uploadedImage}
										alt="Uploaded"
										className="uploaded-image"
									/>
								)}
							</div>
							{uploadedImage && (
								<div>
									<Button className="text-center" onClick={handleRemoveImage}>
										Remove Image
									</Button>
								</div>
							)}
						</Col>
					</div>
				</Col>
				<Col>
					<div className="d-flex justify-content-center align-items-center mt-5">
						<Container
							className="p-5 m-3"
							style={{ backgroundColor: "#E8E8E4" }}
						>
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
								<thead className="text-center">
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
												{new Date(availability.date).toLocaleDateString(
													"en-GB",
													{
														weekday: "short",
														year: "numeric",
														month: "short",
														day: "numeric",
													}
												)}
											</td>
											<td className="text-center">
												{new Date(
													`1970-01-01T${availability.fromTime}Z`
												).toLocaleTimeString("en-US", {
													hour24: true,
													hour: "numeric",
													minute: "numeric",
													timeZone: "UTC",
												})}
											</td>
											<td className="text-center">
												{new Date(
													`1970-01-01T${availability.toTime}Z`
												).toLocaleTimeString("en-US", {
													hour24: true,
													hour: "numeric",
													minute: "numeric",
													timeZone: "UTC",
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
							to={`/CurrentUserMatching?username=${
								location.search.split("=")[1]
							}`}
							style={{ textDecoration: "none" }}
						>
							<Button
								className="d-grid gap-2 col-10 mx-auto mb-3"
								type="submit"
							>
								View Matching Availabilities
							</Button>
						</Link>
						<Link
							to="/ViewAllAvailabilities"
							style={{ textDecoration: "none" }}
						>
							<Button
								className="d-grid gap-2 col-10 mx-auto mb-3"
								type="submit"
							>
								View All Availabilities
							</Button>
						</Link>
					</div>
				</Col>
			</Row>
			<Footer />
		</>
	);
};
export default InputAvailabilitiesPage;




































