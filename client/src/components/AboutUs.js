import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Heading from "./Heading";
import Footer from "./Footer";

const teamMembers = [
	{
		id: 1,
		name: "SAHAR",
		position: "FULL-STACK DEVELOPER",
		linkedin: "https://www.linkedin.com/in/sahar-karimi-a9ab18242/",
		image: require("../images/sahar.jpg"),
	},
	{
		id: 2,
		name: "ZAW",
		position: "FRONT-END DEVELOPER",
		linkedin: "https://www.linkedin.com/in/zawmyokhing/",
		image: require("../images/zaw.jpg"),
	},
	{
		id: 3,
		name: "BARRY",
		position: "FULL-STACK DEVELOPER",
		linkedin: "https://www.linkedin.com/in/mamadou-dian-barry-542758243/",
		image: require("../images/barry.jpg"),
	},
	{
		id: 4,
		name: "MIGUEL",
		position: "FULL-STACK DEVELOPER",
		linkedin: "https://www.linkedin.com/in/miguel-c-560794201/",
		image: require("../images/miguel.jpg"),
	},
	{
		id: 5,
		name: "KHESIWE",
		position: "QA-TESTER",
		linkedin: "https://www.linkedin.com/in/khesiwe-dube-6874ab212/",
		image: require("../images/khesiwe.jpg"),
	},
];

function About() {
	const [showMembers, setShowMembers] = useState(false);
	const [showProject, setShowProject] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setShowMembers(true);
		}, 2000);
	}, []);
	useEffect(() => {
		if (showMembers) {
			setTimeout(() => {
				setShowProject(true);
			}, 2000);
		}
	}, [showMembers]);

	return (
		<div style={{ backgroundColor: "#e8e8e4", minHeight: "100vh" }}>
			<Heading />
			<div style={{ padding: "20px", color: "black" }}>
				<h1 style={{ textAlign: "center", marginTop: "28px" }}>
					We are team WEB-WARRIORS.
				</h1>
			</div>
			{showMembers && (
				<div style={{ display: "flex", justifyContent: "center" }}>
					{teamMembers.map((member) => (
						<div
							key={member.id}
							style={{ textAlign: "center", margin: "20px" }}
						>
							<img
								src={member.image.default}
								alt={member.name}
								style={{ width: "150px", height: "150px", borderRadius: "50%" }}
							/>
							<h3>
								<a
									href={member.linkedin}
									target="_blank"
									rel="noopener noreferrer"
								>
									{member.name}
								</a>
							</h3>
							<p>{member.position}</p>
						</div>
					))}
				</div>
			)}
			{showProject && (
				<>
					<Card
						className="p-5"
						style={{ backgroundColor: "#e8e8e4", minHeight: "100vh" }}
					>
						<h2 style={{ textAlign: "center", marginTop: "20px" }}>
							OUR PROJECT
						</h2>
						<p style={{ fontSize: "23px" }}>
							Our team is dedicated to simplifying the process of coordinating
							work for trainees from diverse backgrounds who work
							collaboratively throughout the week. We understand that scheduling
							can be a daunting task, as each individual has their own unique
							circumstances and availability. From night shifts to childcare
							responsibilities, availability can vary from week to week. That's
							why we are committed to creating a user-friendly application that
							streamlines the scheduling process. Our innovative solution allows
							trainees to easily input their availability and preferences, and
							the system will automatically generate a schedule that
							accommodates everyone's needs. This makes it easy for trainees to
							find a suitable time to work and optimize their productivity. At
							our core, we are dedicated to making the scheduling process as
							seamless as possible, so that trainees can focus on what really
							matters: achieving their goals and making progress in their
							careers.
						</p>
					</Card>
				</>
			)}
			<Footer />
		</div>
	);
}
export default About;