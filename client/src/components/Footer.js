import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
	return (
		<footer className="bg-light py-4">
			<Container>
				{/* <Row className="justify-content-center">
					<Col>
						<h4>Contact Us</h4>
						<p>
							Email:{" "}
							<a href="contact@codeyourfuture.io <contact@codeyourfuture.io>;">
								info@example.com
							</a>
						</p>
					</Col>
					<Col>
						<Row> */}
							<h4>Follow Us</h4>
							
								<a href="https://twitter.com/CodeYourFuture">Twitter</a>
								<a href="https://www.facebook.com/codeyourfuture.io">
									Facebook
								</a>
								<a href="https://www.instagram.com/codeyourfuture_/">
									Instagram
								</a>
							
						{/* </Row>
					</Col>
				</Row> */}

				{/* <Row>
					<Col> */}
						<p className="text-center">&copy; 2023 web-warriors.</p>
					{/* </Col>
				</Row> */}
			</Container>
		</footer>
	);
}
export default Footer;


