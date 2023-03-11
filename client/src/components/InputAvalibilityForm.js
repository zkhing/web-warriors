import { useState } from "react";
import { Container, Col, Row, Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const InputAvalibilityForm = () => {
	const [date, setDate] = useState("");
	const [fromTime, setFromTime] = useState("");
	const [toTime, setToTime] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<Container className="container-two bg-secondary">
				<Row>
					<Col className="col-sm-3">
						<Card>
							<Card.Img
								className="img-thumbnail"
								src="https://media.licdn.com/dms/image/C4D03AQGTh1-xzMWhPQ/profile-displayphoto-shrink_800_800/0/1544442059256?e=2147483647&v=beta&t=mmATpgPPWJy0ZHPSe0VtuleYA1dwt9Pt-nRrkKOjXUI"
							/>
							<Card.Text className="text-center mt-2">
								Name: Zaw Khing
							</Card.Text>
							<Button className="bg-danger">Log out</Button>
						</Card>
					</Col>

					<Col>
						<Form onSubmit={handleSubmit} className="form-input">
							<Card.Title className="text-white text-center my-3">
								Study-buddies Booking
							</Card.Title>

							<Row>
								<Col>
									<Form.Group controlId="formDate">
										<Form.Label>Available Date</Form.Label>
										<Form.Control
											type="date"
											value={date}
											min="2023-01-01"
											max="2023-12-31"
											onChange={(e) => setDate(e.target.value)}
										/>
									</Form.Group>
								</Col>

								<Col>
									<Form.Group>
										<Form.Label>From</Form.Label>
										<Form.Control
											type="time"
											value={fromTime}
											min="17:00"
											max="23:00"
											required
											onChange={(e) => setFromTime(e.target.value)}
										/>
									</Form.Group>
								</Col>

								<Col>
									<Form.Group>
										<Form.Label>To</Form.Label>
										<Form.Control
											type="time"
											value={toTime}
											min="17:00"
											max="23:00"
											required
											onChange={(e) => setToTime(e.target.value)}
										/>
									</Form.Group>
								</Col>

								{/* <Link to="/" element={<Login />}> */}
								<Button
									className="d-grid gap-2 col-6 mx-auto mt-4"
									type="submit"
								>
									Submit
								</Button>
								{/* </Link> */}
							</Row>
						</Form>

						<table className="table table-striped mt-5">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Date</th>
									<th scope="col">From</th>
									<th scope="col">To</th>
									<th scope="col">Duration</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">1</th>
									<td>01/01/2023</td>
									<td>12:00</td>
									<td>13:00</td>
									<td>00:30 min</td>
								</tr>
								<tr>
									<th scope="row">2</th>
									<td>01/01/2023</td>
									<td>12:00</td>
									<td>13:00</td>
									<td>00:45 min</td>
								</tr>
								<tr>
									<th scope="row">3</th>
									<td>01/01/2023</td>
									<td>12:00</td>
									<td>13:00</td>
									<td>60:00 min</td>
								</tr>
							</tbody>
						</table>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default InputAvalibilityForm;
//  const [date, setDate] = useState('')
//  const [timeFrom, setTimeFrom] = useState('')
//  const [timeTo, setTimeTo] = useState('')
//  const [error, setError] = useState(null)

// const handleSubmit = async (e) => {
//    e.preventDefault()
//    const response = await fetch('/api/', {
//      method: 'POST',
//      body: JSON.stringify(Availabilities),
//      headers: {
//        'Content-Type': 'application/json'
//      }
//    })
//    const json = await response.json()

//    if (!response.ok) {
//      setError(json.error)
//    }
//    if (response.ok) {
//      setDate("")
//      setTimeFrom('')
//      setTimeTo('')

//      console.log('My avalabilities', json)
//    }

//  }

//  return (
//    )
