import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function LoginPage() {
	const [username, setUsername] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!username) {
		  alert("Please enter a username!");
		  return;
		}
		console.log(username);
		try {
		  const response = await fetch(`/api/users/${username}`);
		  const data = await response.json();
		  console.log(data);
		  if (data.length > 0) {
			window.location.href = `InputAvailabilitiesPage?username=${username}`;
		  } else {
			alert("The Username you entered does not match any student, try again!!");
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
			{/* <div className="d-flex justify-content-between mt-3"> */}
				<Card className="p-3">
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formEmail">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="username"
								value={username}
								onChange={handleInputChange}
							/>
						</Form.Group>

						<Button className="d-grid gap-2 col-6 mx-auto mt-3" type="submit">
							Log in
						</Button>
					</Form>
				</Card>
			{/* </div> */}
		</>
	);
}

export default LoginPage;

