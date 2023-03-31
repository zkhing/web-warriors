import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Footer() {
	return (
		<div className="bg-light p-2 mt-4">
			<h4 className="text-center"> Follow Us </h4>

			<div className="d-flex justify-content-evenly fa-2x">
				<a href="https://www.facebook.com/codeyourfuture.io/?locale=en_GB">
					<FontAwesomeIcon icon={faFacebook} />
				</a>
				<a href="https://www.instagram.com/codeyourfuture_/">
					<FontAwesomeIcon icon={faInstagram} />
				</a>
				<a href="https://twitter.com/CodeYourFuture">
					<FontAwesomeIcon icon={faTwitter} />
				</a>
			</div>
			<div className="d-flex justify-content-evenly fa-2x">
				<h4>Contact us on admin@cyf.com</h4>
			</div>

			<p className="text-center mt-3">&copy; Copyright 2023 web-warriors </p>
		</div>
	);
}
export default Footer;


