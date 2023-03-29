
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








