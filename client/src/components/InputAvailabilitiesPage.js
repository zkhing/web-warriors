import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Heading";

const InputAvailabilitiesPage = () => {
	const [date, setDate] = useState("");
	const [fromTime, setFromTime] = useState("");
	const [toTime, setToTime] = useState("");
	const [availabilities, setAvailabilities] = useState([]);
	const location = useLocation();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const username = searchParams.get("username");
		// Do something with the username, e.g. display the user's name
	}, [location]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newAvailability = { date, fromTime, toTime };
		const response = await fetch(`/api/postavailabilities`, {
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
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="date" className="col-sm-2 col-form-label">
            Available Date
          </label>
          <div className="col-sm-4">
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="fromTime" className="col-sm-2 col-form-label">
            From
          </label>
          <div className="col-sm-4">
            <input
              type="time"
              className="form-control"
              id="fromTime"
              value={fromTime}
              onChange={(event) => setFromTime(event.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="toTime" className="col-sm-2 col-form-label">
            To
          </label>
          <div className="col-sm-4">
            <input
              type="time"
              className="form-control"
              id="toTime"
              value={toTime}
              onChange={(event) => setToTime(event.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-2"></div>
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>

      {availabilities.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>From</th>
              <th>To</th>
              {/* <th>Available trainees</th> */}
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
        </table>
      ) : (
        <div>No availability matching your availability</div>
      )}
    </>
  );
};

export default InputAvailabilitiesPage;































// import {
// Col,
// Row,
// Form,
// Table,
// Button,
// } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
//     return (
// 		<>
        
// 			<Form>
//                 <Row>
//                   <Col>
//                    <Form.Group>
// 						<Form.Label>Available Date</Form.Label>
// 						<Form.Control type="date" id="date" />
//                     </Form.Group>
//                  </Col>
                
//                  <Col>
//                   <Form.Group>
// 						<Form.Label>From</Form.Label>
// 						<Form.Control type="time" id="from_time" />
//                   </Form.Group>
//                  </Col>
               
//                  <Col>
//                   <Form.Group>
//                         <Form.Label>To</Form.Label>
// 						<Form.Control type="time" id="to_time" />
//                  </Form.Group>
//                  </Col>
//               </Row>

//                 <Button onClick={handleClick} type="submit">
// 					Submit
// 				</Button>
// 			</Form>

				
// 				<Table className="table">
// 					<thead>
// 						<tr>
// 							<th>Username</th>
// 							<th>Date</th>
// 							<th>From</th>
// 							<th>To</th>
// 						</tr>
// 					</thead>
// 					<tbody id="tbody"></tbody>
// 				</Table>
             
// 			</>
// 	);
// };
// export default InputAvailabilitiesPage;

{/* <div>
            <form>
                <label htmlFor="date"> Available Date</label>
                <input type="date" id="date"></input>
                <label htmlFor="from"> From </label>
                <input type="time" id="from_time"></input>
                <label htmlFor="to">To</label>
                <input type="time" id="to_time"></input>
            </form>
            <br></br>
            <table className="table" >
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                    </tr>
                </thead>
                <tbody id="tbody">

                </tbody>
            </table >

            <button onClick={handleClick}>Send</button>
        </div> */}