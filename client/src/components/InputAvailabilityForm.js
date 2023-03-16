import { useState } from "react";
import {
	Container,
	Col,
	Row,
	Button,
	Form,
	Table,
	Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const items = [
	{ name: "Barry", date: "2023-03-17", time_from: "12:00", time_to: "14:00" },
	{ name: "Khesiwe", date: "2023-03-17", time_from: "12:00", time_to: "14:00" },
	{ name: "Miguel", date: "2023-03-18", time_from: "12:00", time_to: "14:00" },
	{ name: "Sahar", date: "2023-03-19", time_from: "14:00", time_to: "17:00" },
];

const InputAvailabilityForm = () => {
	const [date, setDate] = useState("");
	const [fromTime, setFromTime] = useState("");
	const [toTime, setToTime] = useState("");

	const [list,setList] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	function logWhenClicked() {
       console.log(date);
		if(date){
		   const newList = items.filter(
					(item) =>
						item.date === date &&
						item.time_from === fromTime &&
						item.time_to === toTime
				);
		   console.log(newList,list);
           setList(newList);
		}
	}

	return (
		<>
			<Container className="container-two bg-secondary">
				<Row>
					<Col className="col-sm-2">
						<Card>
							<Card.Img
								className="img-thumbnail"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiAuZRYkEMaN8PFfU_LQBMZ8sp2rB_PBXpLOFPYEXONMVFAZVo9deIY210wXfM5jEkdaI&usqp=CAU"
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
								User Availability
							</Card.Title>

							<Row>
								<Col>
									<Form.Group controlId="formDate">
										<Form.Label>Date</Form.Label>
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
											required
											onChange={(e) => setToTime(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>
						</Form>

						<Button
							className="d-grid gap-2 col-6 mx-auto mt-3"
							type="button"
							onClick={logWhenClicked}
						>
							Submit
						</Button>

						<Card.Title className="text-white text-center my-5">
							Trainees Matching Table
						</Card.Title>
						<Table className="table table-striped mt-6">
							<thead>
								<tr>
									<th scope="col">Name</th>
									<th scope="col">Date</th>
									<th scope="col">From</th>
									<th scope="col">To</th>
								</tr>
							</thead>

							<tbody>
								{list.map((data, index) => (
									<tr key={index}>
										<td>{data.name}</td>
										<td>{data.date}</td>
										<td>{data.time_from}</td>
										<td>{data.time_to}</td>
									</tr>
								))}
							</tbody>
						</Table>

						{/* {!list && <p/} */}

						<Button className="d-grid gap-2 col-6 mx-auto mt-3" type="button">
							Confirm
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default InputAvailabilityForm;


