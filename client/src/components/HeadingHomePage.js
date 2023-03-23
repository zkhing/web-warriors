import { Container, Nav, Navbar, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo1.png";


function HeadingHomePage() {
    return (
        <>
            <Navbar bg="secondary" variant="dark">
                <Navbar.Brand href="#home">
                    <img
                        alt="CYF Logo"
                        src={logo}
                        width="30%"
                        height="30%"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                {/* <Card.Title className="mx-auto">Study-Buddies-App</Card.Title> */}
                <Container className="d-flex justify-content-end">
                    <Nav href="#home">
                        <Nav.Link href="home">Home</Nav.Link>
                        <Nav.Link href="AboutUs">About us</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default HeadingHomePage;
