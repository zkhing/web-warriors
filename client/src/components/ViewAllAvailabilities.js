import React, { useState, useEffect } from "react";
import {  Button } from "react-bootstrap";
import Heading from "./Heading";
import Footer from "./Footer";

function ViewAllAvailabilities(props) {
	const [availabilities, setAvailabilities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedAvailability, setSelectedAvailability] = useState(null);
	const [matchingUsers, setMatchingUsers] = useState([]);
	const [matchingUserNames, setMatchingUserNames] = useState([]);

	useEffect(() => {
		async function fetchAvailabilities() {
			const response = await fetch("/api/availabilities");
			const data = await response.json();
			setAvailabilities(data);
			setLoading(false);
		}
		fetchAvailabilities();
	}, []);

	async function fetchMatchingUsers(date, fromTime, toTime) {
		const matchingAvailabilities = availabilities.filter(
			(availability) =>
				availability.date === date &&
				availability.from_time === fromTime &&
				availability.to_time === toTime
		);
		const matchingUsers = matchingAvailabilities.map((availability) => ({
			email: availability.email,
			firstName: availability.firstName,
			lastName: availability.lastName,
			username: availability.username,
		}));
		setMatchingUsers(matchingUsers);
		setMatchingUserNames(
			matchingUsers.map((user) => `${user.username || user.email}`)
		);
	}

	function handleShowMatchingUsersClick(availability) {
		setSelectedAvailability(availability);
		fetchMatchingUsers(
			availability.date,
			availability.from_time,
			availability.to_time
		);
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Heading />
			<table className="table table-striped table-hover mt-5">
				<thead>
					<tr>
						<th style={{ fontSize: "1.5rem" }} className="text-center">
							Date
						</th>
						<th style={{ fontSize: "1.5rem" }} className="text-center">
							From 
						</th>
						<th style={{ fontSize: "1.5rem" }} className="text-center">
							To 
						</th>
						<th style={{ fontSize: "1.5rem" }} className="text-center">
							Matching Trainees
						</th>
					</tr>
				</thead>
				<tbody>
					{availabilities.map((availability) => (
						<tr key={availability.id}>
							{/* <td className="text-center">
							{availability.username || availability.email}
						</td> */}
							<td className="text-center">{new Date(availability.date)
								.toLocaleDateString("en-GB", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
							</td>
							<td className="text-center">{new Date(`1970-01-01T${availability.from_time}Z`)
								.toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "numeric" })}
							</td>
							<td className="text-center">{new Date(`1970-01-01T${availability.to_time}Z`)
								.toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "numeric" })}
							</td>
							<td className="text-center">
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => handleShowMatchingUsersClick(availability)}
								>
									Show matching Trainees
								</button>
								{selectedAvailability === availability &&
								matchingUserNames.length > 0 ? (
									<ul className="list-unstyled matching-users">
										{matchingUserNames.map((userName) => (
											<li key={userName}>{userName}</li>
										))}
									</ul>
								) : (
									<div className="no-matching-users">No matching Trainees</div>
								)}
							</td>
						</tr>
					))}
					</tbody>
				</table>
			<Button onClick={() => window.history.back()}>Go Back</Button>
			<Footer />
		</div>
	);
}

export default ViewAllAvailabilities;
