
import { Container, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Heading() {
  return (
		<>
			<Navbar bg="secondary" variant="dark">
				<Navbar.Brand href="#home">
					<img
						alt="CYF Logo"
						src="https://www.pngkey.com/png/full/20-206722_logo-code-your-future-logo.png"
						width="30%"
						height="30%"
						className="d-inline-block align-top"
					/>
				</Navbar.Brand>
				<Container className="d-flex justify-content-end">
					<Nav href="#home">
						<Nav.Link href="home">Home</Nav.Link>
						<Nav.Link href="login">Log in</Nav.Link>
						<Nav.Link href="logout">Log out</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default Heading;


 