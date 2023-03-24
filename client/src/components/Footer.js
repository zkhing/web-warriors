import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function Footer() {
	return (
		<footer className="bg-light py-4">
			<Container>
				<Row className="justify-content-center">
					<Col md={4}>
						<h4>Contact Us</h4>
						<p>
							Email:{" "}
							<a href="contact@codeyourfuture.io <contact@codeyourfuture.io>;">
								info@example.com
							</a>
						</p>
						<p>
							Phone: <a href="tel:123-456-7890">123-456-7890</a>
						</p>
					</Col>
					<Col md={4}>
						<h4>Follow Us</h4>
						<p>
							<a href="https://twitter.com/CodeYourFuture">Twitter</a>
						</p>
						<p>
							<a href="https://www.facebook.com/codeyourfuture.io">Facebook</a>
						</p>
						<p>
							<a href="https://www.instagram.com/codeyourfuture_/">Instagram</a>
						</p>
					</Col>
				</Row>

				<Row>
					<Col>
						<p className="text-center">
							&copy; 2023 Example.com. All rights reserved.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
}
export default Footer;