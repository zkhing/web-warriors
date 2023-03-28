
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.png";

function Heading() {
  return (
		<>
			<Navbar className="bg-light">
				<Navbar.Brand href="#home">
					<img
						alt="CYF Logo"
						src={logo}
						width="30%"
						height="30%"
						className="d-inline-block align-top"
					/>
				</Navbar.Brand>
				<Container className="d-flex justify-content-end">
					<Nav href="#home" className="hover-overlay">
						<Nav.Link href="home">Home</Nav.Link>
						<Nav.Link href="AboutUs">About us</Nav.Link>
						<Nav.Link href="contact">Contact</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default Heading;


 