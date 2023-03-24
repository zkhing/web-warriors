// import React, { useState, useEffect } from "react";
// function AvailabilityTable(props) {
// 	const [availabilities, setAvailabilities] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	useEffect(() => {
// 		async function fetchAvailabilities() {
// 			const response = await fetch("/api/availabilities");
// 			const data = await response.json();
// 			setAvailabilities(data);
// 			setLoading(false);
// 		}
// 		fetchAvailabilities();
// 	}, []);
// 	if (loading) {
// 		return <div>Loading...</div>;
// 	}
// 	return (
// 		<table>
// 			<thead>
// 				<tr>
// 					<th>Username</th>
// 					<th>Date</th>
// 					<th>From Time</th>
// 					<th>To Time</th>
// 					<th>Matching Users</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{availabilities.map((availability) => (
// 					<tr key={availability.id}>
// 						<td>{availability.username}</td>
// 						<td>{availability.date}</td>
// 						<td>{availability.from_time}</td>
// 						<td>{availability.to_time}</td>
// 						<td>
// 							<button
// 								onClick={() =>
// 									fetch(
// 										`/api/matchingAvailabilities?date=${availability.date}&from_time=${availability.from_time}&to_time=${availability.to_time}`
// 									)
// 										.then((response) => response.json())
// 										.then((data) => console.log(data))
// 								}
// 							>
// 								Show matching users
// 							</button>
// 						</td>
// 					</tr>
// 				))}
// 			</tbody>
// 		</table>
// 	);
// }
// export default AvailabilityTable;
// ----------------------------------

// import React, { useState, useEffect } from "react";

// function AvailabilityTable(props) {
// 	const [availabilities, setAvailabilities] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [selectedAvailability, setSelectedAvailability] = useState(null);
// 	const [matchingUsers, setMatchingUsers] = useState([]);
// 	useEffect(() => {
// 		async function fetchAvailabilities() {
// 			const response = await fetch("/api/availabilities");
// 			const data = await response.json();
// 			setAvailabilities(data);
// 			setLoading(false);
// 			setMatchingUsers((prevMatchingUsers) => [
// 				...prevMatchingUsers,
// 				...matchingUsers,
// 			]);
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
// 			name: availability.name,
// 		}));
// 		setMatchingUsers(matchingUsers);
// 	}

// 	function handleShowMatchingUsersClick(availability) {
// 		setSelectedAvailability(availability);
// 		fetchMatchingUsers(
// 			availability.date,
// 			availability.from_time,
// 			availability.to_time
// 		);
// 	}
// 	if (loading) {
// 		return <div>Loading...</div>;
// 	}
// 	return (
// 		<table>
// 			<thead>
// 				<tr>
// 					<th>Username</th>
// 					<th>Date</th>
// 					<th>From Time</th>
// 					<th>To Time</th>
// 					<th>Matching Users</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{availabilities.map((availability) => (
// 					<tr key={availability.id}>
// 						<td>{availability.username}</td>
// 						<td>{availability.date}</td>
// 						<td>{availability.from_time}</td>
// 						<td>{availability.to_time}</td>
// 						<td>
// 							<button

// 								onClick={() => handleShowMatchingUsersClick(availability)}
// 							>
// 								Show matching users
// 							</button>
// 							{selectedAvailability === availability &&
// 							matchingUsers.length > 0 ? (
// 								<ul>
// 									{matchingUsers.map((user) => (
// 										<li key={user.email}>{user.name}</li>
// 									))}
// 								</ul>
// 							) : (
// 								<div>No matching users</div>
// 							)}
// 						</td>
// 					</tr>
// 				))}
// 			</tbody>
// 		</table>
// 	);
// }
// export default AvailabilityTable;

// -----------------------------------2

import React, { useState, useEffect } from "react";


function AvailabilityTable(props) {
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
			matchingUsers.map((user) => `${user.username || user.email}`) // show username or email
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
		<table>
			<thead>
				<tr>
					<th>Username</th>
					<th>Date</th>
					<th>From Time</th>
					<th>To Time</th>
					<th>Matching Users</th>
				</tr>
			</thead>
			<tbody>
				{availabilities.map((availability) => (
					<tr key={availability.id}>
						<td>{availability.username || availability.email}</td>
						<td>{new Date(availability.date).toLocaleDateString()}</td>
						<td>{availability.from_time}</td>
						<td>{availability.to_time}</td>
						<td>
							<button
								onClick={() => handleShowMatchingUsersClick(availability)}
							>
								Show matching users
							</button>
							{selectedAvailability === availability &&
							matchingUserNames.length > 0 ? (
								<ul>
									{matchingUserNames.map((userName) => (
										<li key={userName}>{userName}</li>
									))}
								</ul>
							) : (
								<div>No matching users</div>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default AvailabilityTable;












