// import React, { useState, useEffect } from "react";
// import Heading from "./Heading";
// import Footer from "./Footer";
// import { Container,Table,Button } from "react-bootstrap";

// function ViewAllAvailabilities(props) {
// 	const [availabilities, setAvailabilities] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [selectedAvailability, setSelectedAvailability] = useState(null);
// 	const [matchingUsers, setMatchingUsers] = useState([]);
// 	const [matchingUserNames, setMatchingUserNames] = useState([]);

// 	useEffect(() => {
// 		async function fetchAvailabilities() {
// 			const response = await fetch("/api/availabilities");
// 			const data = await response.json();
// 			setAvailabilities(data);
// 			setLoading(false);
// 		}
// 		fetchAvailabilities();
// 	}, []);

// 	async function fetchMatchingUsers(date, fromTime, toTime) {
// 		const matchingAvailabilities = availabilities.filter(
// 			(availability) =>
// 				availability.date === date &&
// 				availability.from_time === fromTime &&
// 				availability.to_time === toTime
// 		);
// 		const matchingUsers = matchingAvailabilities.map((availability) => ({
// 			email: availability.email,
// 			firstName: availability.firstName,
// 			lastName: availability.lastName,
// 			username: availability.username,
// 		}));
// 		setMatchingUsers(matchingUsers);
// 		setMatchingUserNames(
// 			matchingUsers.map((user) => `${user.username || user.email}`)
// 		);
// 	}

// 	// function handleShowMatchingUsersClick(availability) {
// 	// 	setSelectedAvailability(availability);
// 	// 	fetchMatchingUsers(
// 	// 		availability.date,
// 	// 		availability.from_time,
// 	// 		availability.to_time
// 	// 	);
// 	// }

// 	if (loading) {
// 		return <div>Loading...</div>;
// 	}

// 	return (
// 		<>
// 			<Heading />
// 			{/* <Container className="p-5 my-5" style={{ backgroundColor: "#e8e8e4" }}> */}
// 			<div style={{ backgroundColor: "#e8e8e4" }}>
// 				<h1 className="text-center p-4">All Trainees Availabilities</h1>
// 				<Table striped bordered hover>
// 					<thead>
// 						<tr>
// 							<th style={{ fontSize: "1.5rem" }} className="text-center">
// 								Date
// 							</th>
// 							<th style={{ fontSize: "1.5rem" }} className="text-center">
// 								From
// 							</th>
// 							<th style={{ fontSize: "1.5rem" }} className="text-center">
// 								To
// 							</th>
// 							<th style={{ fontSize: "1.5rem" }} className="text-center">
// 								Matching Trainees
// 							</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{availabilities.map((availability) => (
// 							<tr key={availability.id}>
// 								<td className="text-center">
// 									{new Date(availability.date).toLocaleDateString("en-GB", {
// 										weekday: "short",
// 										year: "numeric",
// 										month: "short",
// 										day: "numeric",
// 									})}
// 								</td>
// 								<td className="text-center">
// 									{new Date(
// 										`1970-01-01T${availability.from_time}Z`
// 									).toLocaleTimeString("en-US", {
// 										hour12: true,
// 										hour: "numeric",
// 										minute: "numeric",
// 									})}
// 								</td>
// 								<td className="text-center">
// 									{new Date(
// 										`1970-01-01T${availability.to_time}Z`
// 									).toLocaleTimeString("en-US", {
// 										hour12: true,
// 										hour: "numeric",
// 										minute: "numeric",
// 									})}
// 								</td>
// 								<td className="text-center">
// 									{/* <button
// 										type="button"
// 										className="btn btn-primary"
// 										onClick={() => handleShowMatchingUsersClick(availability)}
// 									>
// 										Show matching Trainees
// 									</button> */}
// 									{selectedAvailability === availability &&
// 									matchingUserNames.length > 0 ? (
// 										<ul className="list-unstyled matching-users">
// 											{matchingUserNames.map((userName) => (
// 												<li key={userName}>{userName}</li>
// 											))}
// 										</ul>
// 									) : (
// 										<div className="no-matching-users">
// 											No matching Trainees
// 										</div>
// 									)}
// 								</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</Table>
// 				<Button
// 					variant="outline-danger"
// 					className="d-grid gap-2 col-3 mx-auto m-3"
// 					onClick={() => window.history.back()}
// 				>
// 					Back To Input
// 				</Button>
// 				{/* </Container> */}
// 			</div>

// 			<Footer />
// 		</>
// 	);
// }

// export default ViewAllAvailabilities;

// ------------------------------------------

import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Heading from "./Heading";
import Footer from "./Footer";

const ViewAllAvailabilities = () => {
	const [availabilities, setAvailabilities] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	useEffect(() => {
		fetch("/api/availabilities")
			.then((res) => res.json())
			.then((data) => {
				const nonDuplicateAvailabilities = data.reduce(
					(accumulator, currentValue) => {
						const { date, from_time, to_time } = currentValue;
						const existingAvailability = accumulator.find(
							(a) =>
								a.date === date &&
								a.from_time === from_time &&
								a.to_time === to_time
						);
						if (existingAvailability) {
							existingAvailability.usernames.push(currentValue.username);
						} else {
							accumulator.push({
								...currentValue,
								usernames: [currentValue.username],
							});
						}
						return accumulator;
					},
					[]
				);
				setAvailabilities(nonDuplicateAvailabilities);
			})
			.catch((error) => console.log(error));
	}, []);

	
	const filteredAvailabilities = availabilities.filter((availability) =>
		availability.usernames.some((username) =>
			username.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return (
		<>
			<Heading />
			<div style={{ backgroundColor: "#e8e8e4" }}>
				<h1 className="text-center p-4">All Trainees Availabilities</h1>
				<Form className="d-grid gap-2 col-6 mx-auto m-3">
					<Form.Group controlId="formSearch">
						{/* <Form.Label className="pl-3">Search by Username:</Form.Label> */}
						<Form.Control
							type="text"
							placeholder="Search by username"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</Form.Group>
				</Form>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th style={{ fontSize: "1.5rem" }} className="text-center">
								Date
							</th>
							<th style={{ fontSize: "1.5rem" }} className="text-center">
								From
							</th>
							<th style={{ fontSize: "1.5rem" }} className="text-center">
								To{" "}
							</th>
							<th style={{ fontSize: "1.5rem" }} className="text-center">
								Matching Trainees
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredAvailabilities.map((availability, index) => (
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
										`1970-01-01T${availability.from_time}Z`
									).toLocaleTimeString("en-US", {
										hour12: true,
										hour: "numeric",
										minute: "numeric",
									})}
								</td>
								<td className="text-center">
									{new Date(
										`1970-01-01T${availability.to_time}Z`
									).toLocaleTimeString("en-US", {
										hour12: true,
										hour: "numeric",
										minute: "numeric",
									})}
								</td>
								<td className="text-center">
									{availability.usernames.join(", ")}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<Button
					variant="outline-danger"
					className="d-grid gap-2 col-3 mx-auto"
					onClick={() => window.history.back()}
				>
					Back To Input
				</Button>
			</div>
			<Footer />
		</>
	);
};
export default ViewAllAvailabilities;








