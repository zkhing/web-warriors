// import  "./AboutUs.css";

// function AboutUs() {

// return(
//     <div className="content">
//         <h1>Our Mission</h1>
//         <p> Our team is dedicated to simplifying the process of coordinating
//             work for trainees from diverse backgrounds who work collaboratively
//             throughout the week. We understand that scheduling can be a daunting
//             task, as each individual has their own unique circumstances and
//             availability. From night shifts to childcare responsibilities,
//             availability can vary from week to week. That's why we are committed
//             to creating a user-friendly application that streamlines the
//             scheduling process.
//         </p>
//         <p> Our innovative solution allows trainees to
//             easily input their availability and preferences, and the system will
//             automatically generate a schedule that accommodates everyone's
//             needs. This makes it easy for trainees to find a suitable time to
//             work and optimize their productivity. At our core, we are dedicated
//             to making the scheduling process as seamless as possible, so that
//             trainees can focus on what really matters: achieving their goals and
//             making progress in their careers.
//         </p>
//         <h1>Our responsibilities</h1>

//         <h1>individual statement</h1>
//         <img src="https://media.licdn.com/dms/image/D4E03AQEX9-PxBKtP5g/profile-displayphoto-shrink_800_800/0/1668793812778?e=1684972800&v=beta&t=V-V5kK78Tw3i_F0aunfvmFw8NQexe7N04Fm9sS--MJo"/>
//         <h6>Mamadou Dian Barry</h6>
//         <p>Hardworking, motivated and reliable web developer who has experience working individually as part of a team. After a decade of working as technician and engineer, I decided to follow my passion for technology, joining an intense year-long bootcamp in web development. I am currently finalising work on full-stack project and am looking for my next opportunity.</p>
//     </div>
// );

// }

// export default AboutUs;

import React, { useState, useEffect } from "react";
// import "./About.css";
const teamMembers = [
	{
		id: 1,
		name: "SAHAR",
		position: "FULL-STACK DEVELOPER",
		linkedin: "https://www.linkedin.com/in/sahar-karimi-a9ab18242/",
		image: require("./sahar.jpg"),
	},
	{
		id: 2,
		name: "ZAW",
		position: "FRONT-END DEVELOPER",
		linkedin: "https://www.linkedin.com/in/zawmyokhing/",
		image: require("./zaw.jpg"),
	},
	{
		id: 3,
		name: "BARRY",
		position: "FULL-STACK DEVELOPER",
		linkedin: "https://www.linkedin.com/in/mamadou-dian-barry-542758243/",
		image: require("./barry.jpg"),
	},
	{
		id: 4,
		name: "MIGUEL",
		position: "FULL-STACK DEVELOPER",
		linkedin: "https://www.linkedin.com/in/miguel-c-560794201/",
		image: require("./miguel.jpg"),
	},
	{
		id: 5,
		name: "KHESIWE",
		position: "QA-TESTER",
		linkedin: "https://www.linkedin.com/in/khesiwe-dube-6874ab212/",
		image: require("./khesiwe.jpg"),
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
		<div style={{ backgroundColor: "grey", minHeight: "100vh" }}>
			<div style={{ padding: "20px", color: "black" }}>
				<h1 style={{ textAlign: "center", marginTop: "100px", color: "white" }}>
					WHO WE ARE
				</h1>
				<p style={{ textAlign: "center", color: "white", fontSize: "28px" }}>
					We are team WEB-WARRIORS.
				</p>
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
					<h2
						style={{ textAlign: "center", marginTop: "20px", color: "white" }}
					>
						OUR PROJECT
					</h2>
					<p style={{ textAlign: "center", color: "white", fontSize: "28px" }}>
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
					</p>
				</>
			)}
		</div>
	);
}
export default About;