import { useState } from "react";
import { Container, Col, Row, Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage() {
	const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<Container className="container bg-secondary">
				<Row>
					<Col>
						<Card>
							<Card.Img
								className="img-thumbnail"
								src="https://img.freepik.com/premium-photo/study-group-college-students_53876-72873.jpg"
							/>
						</Card>
					</Col>

					<Col>
						<Form onSubmit={handleSubmit} className="form-container">
							<Card.Img src="https://www.pngkey.com/png/full/20-206722_logo-code-your-future-logo.png" />
							<Form.Group controlId="formEmail">
								<Form.Control
									className="mt-5"
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Username or Email"
								/>
							</Form.Group>

							{/* <Form.Group controlId="formPassword">
                <Form.Control
                  className="mt-3"
                  type="Password"
                  id="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group> */}

								<Button
									className="d-grid gap-2 col-6 mx-auto mt-3"
									type="button"
								>
									Log in
								</Button>						
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
}
export default LoginPage;

    /* <div>
      <img src="our-image-url.jpg" alt="our" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="Email">Email:</label>
        <input
          type="Email"
          id="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password 1 ">Password:</label>
        <input
          type="Password"
          id="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="Submit">Sign In</button>
      </form>
      {/* <a href="#">Forgot Password?</a> */

