
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Heading";
import LoginPage from "./LoginPage";
import group from "../images/home.jpg";


function Hero() {
  return (
		<>
			<Navbar />
			<div className="d-flex justify-content-between mt-3">
				<Card className="p-3 bg-info" style={{ width: "50%" }}>
					<Card.Img className="img-thumbnail" src={group} />
				</Card>

				<Card className="p-4 bg-info" style={{ width: "50%" }}>
					
						<h1>Welcome to Study Buddies!</h1>
						<Card.Text className="mt-3">
							<p>
								Tired of spending your time trying to organise study groups with
								your peers?
								<br /> You are in the right place! All you have to do is input
								your availabilities and view wo else is available is your cohort
								at your same time.
							</p>
							<p>
								If you don't have username yet, please contact admin@cyf.com to
								set one up
							</p>
							<p>
								If you have username, you can get started by iserting it below:
							</p>
						</Card.Text>
					
					<LoginPage />
					
				</Card>
			</div>
		</>
	);
}

export default Hero;
