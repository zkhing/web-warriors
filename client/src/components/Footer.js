import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Footer() {
	return (
			<Container className="bg-light pt-4">
				<h4 className="text-center">Follow Us</h4>
				
				<div className="d-flex justify-content-evenly fa-2x">
					<a href="https://twitter.com/CodeYourFuture">
						<FontAwesomeIcon icon={faFacebook} />
					</a>
					<a href="https://www.instagram.com/codeyourfuture_/">
						<FontAwesomeIcon icon={faInstagram} />
					</a>
					<a href="https://twitter.com/CodeYourFuture">
						<FontAwesomeIcon icon={faTwitter} />
					</a>
				</div>

				<p className="text-center">&copy; 2023 web-warriors.</p>
			</Container>
	);
}
export default Footer;

