
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Heading";
import home from "../images/home.jpg";

function Hero() {
  return (
		<>
			<Header />
			<div className="d-flex justify-content-between mt-3">
				<Card className="p-3" style={{ width: "50%" }}>
					<Card.Img
						className="img-thumbnail"
						src={home}
					/>
				</Card>

				<Card className="p-4" style={{ width: "50%" }}>
					<Card.Title className="mx-auto">Study-Buddies-App</Card.Title>
					<Card.Text className="mt-3">
						Our team is dedicated to simplifying the process of coordinating
						work for trainees from diverse backgrounds who work collaboratively
						throughout the week. We understand that scheduling can be a daunting
						task, as each individual has their own unique circumstances and
						availability. From night shifts to childcare responsibilities,
						availability can vary from week to week. That's why we are committed
						to creating a user-friendly application that streamlines the
						scheduling process. Our innovative solution allows trainees to
						easily input their availability and preferences, and the system will
						automatically generate a schedule that accommodates everyone's
						needs. This makes it easy for trainees to find a suitable time to
						work and optimize their productivity. At our core, we are dedicated
						to making the scheduling process as seamless as possible, so that
						trainees can focus on what really matters: achieving their goals and
						making progress in their careers.
					</Card.Text>
				</Card>
			</div>
		</>
	);
}

export default Hero;
