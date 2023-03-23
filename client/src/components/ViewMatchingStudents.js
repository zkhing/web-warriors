import React, { useState, useEffect } from "react";
function AvailabilityTable(props) {
	const [availabilities, setAvailabilities] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function fetchAvailabilities() {
			const response = await fetch("/api/availabilities");
			const data = await response.json();
			setAvailabilities(data);
			setLoading(false);
		}
		fetchAvailabilities();
	}, []);
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
						<td>{availability.username}</td>
						<td>{availability.date}</td>
						<td>{availability.from_time}</td>
						<td>{availability.to_time}</td>
						<td>
							<button
								onClick={() =>
									fetch(
										`/api/matchingAvailabilities?date=${availability.date}&from_time=${availability.from_time}&to_time=${availability.to_time}`
									)
										.then((response) => response.json())
										.then((data) => console.log(data))
								}
							>
								Show matching users
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
export default AvailabilityTable;
