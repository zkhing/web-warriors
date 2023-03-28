import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Heading from "./Heading";
import Footer from "./Footer";

const CurrentUserMatching = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get("username");

    fetch(`/api/availabilities1?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        const promises = data.map((availability) => {
          const { date, from_time, to_time } = availability;
          return fetch(`/api/availabilities1?date=${date}&from_time=${from_time}&to_time=${to_time}`)
            .then((res) => res.json())
            .then((matchingAvailabilities) => {
              const matchingUsernames = matchingAvailabilities
                .filter((availability) => availability.username !== username && 
                  availability.date === date && 
                  availability.from_time === from_time && 
                  availability.to_time === to_time)
                .map((availability) => availability.username);
              return { ...availability, matchingUsers: matchingUsernames };
            })
            .catch((error) => {
              console.log(error);
              return { ...availability, matchingUsers: [] };
            });
        });

        Promise.all(promises).then((availabilitiesWithMatchingUsers) => {
          setAvailabilities(availabilitiesWithMatchingUsers.filter((availability) => availability.matchingUsers.length > 0));
        });
      })
      .catch((error) => console.log(error));
  }, [location]);

  return (
		<>
			<Heading />
			<Container className="p-5 my-5" style={{ backgroundColor: "#e8e8e4"}}>
				<h1>Your Matches</h1>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Date</th>
							<th>From</th>
							<th>To</th>
							<th>Available Trainees</th>
						</tr>
					</thead>
					<tbody>
						{availabilities.map((availability, index) => (
							<tr key={index}>
                <td >{new Date(availability.date)
                  .toLocaleDateString("en-GB", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
                <td>
                  {new Date(`1970-01-01T${availability.from_time}Z`)
                  .toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "numeric" })}
                </td>
                <td>
                  {new Date(`1970-01-01T${availability.to_time}Z`)
                    .toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "numeric" })}
                </td>
                <td>{availability.matchingUsers.join(", ")}</td>
              </tr>
						))}
					</tbody>
				</Table>
				<Button onClick={() => window.history.back()}>Go Back</Button>
			</Container>
      <Footer />
		</>
	);
};

export default CurrentUserMatching;



