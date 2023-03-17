import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Heading";
import group from "../images/group-img.jpg";

function LoginPage() {
	const [username, setUsername] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(username);
		try {
			const response = await fetch(`/api/users/${username}`);
			const data = await response.json();
			console.log(data);
			if (data.length === 1) {
				alert("Go to availability link.");
			} else {
				alert("Username not found.");
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred. Please try again later.");
		}
	};

	const handleInputChange = (event) => {
		setUsername(event.target.value);
	};

	return (
		<>
			<Header />
			<div className="d-flex justify-content-between mt-3">
				<Card className="p-3" style={{ width: "50%" }}>
					<Card.Img
						className="img-thumbnail"
						src={group}
					/>
				</Card>

				<Card className="p-3" style={{ width: "50%" }}>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="text"
								placeholder="Username or Email"
								value={username}
								onChange={handleInputChange}
							/>
						</Form.Group>

						<Button className="d-grid gap-2 col-6 mx-auto mt-3" type="submit">
							Log in
						</Button>
					</Form>
				</Card>
			</div>
		</>
	);
}

export default LoginPage;

{/* // <form onSubmit={handleSubmit}>
		//   <div>
		//     <label>Username:</label>
		//     <input
		//       type="text"
		//       placeholder="Enter your username"
		//       value={username}
		//       onChange={handleInputChange}
		//     />
		//   </div>
		//   <button type="submit">Submit</button>
		// </form> */}