import http from "http";
import router from "./api";
import db from "./db";
import app from "./app";
import { connectDb, disconnectDb } from "./db";
import config from "./utils/config";
import logger from "./utils/logger";

const server = http.createServer(app);
require("dotenv").config();

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	logger.info("listening on: %s", bind);
});
// Display all users 

router.get("/users", (req, res) => {
	db.query("SELECT * FROM users")
		.then((result) => res.json(result.rows))
		.catch((error) => {
			res.status(500).json(error);
		});
});

// display all availabilities 

router.get("/availabilities", (req, res) => {
	db.query("SELECT * FROM availabilities", (err, result) => {
		res.json(result.rows);
	});
});





//post new availabilities
router.post("/postavailabilities", (req, res) => {
	const { username, date, fromTime, toTime } = req.body;
	db.query(
<<<<<<< HEAD
		"INSERT INTO availabilities (username, date, from_time, to_time) VALUES ($1, $2, $3, $4)",
		[username, date, fromTime, toTime],
		(err, result) => {
			if (err) {
				res.send("Your availability is not saved properly, please try again!!");
			} else {
				res.send(
					`Data inserted successfully for ${username}, ${date}, ${fromTime} to ${toTime}. Thank you for your time!`
				);
			}
=======
	  "INSERT INTO availabilities (date, from_time, to_time) VALUES ($1, $2, $3)",
	  [date, fromTime, toTime],
	  (err, result) => {
		if (err) {
		  res.send(
			"Your availability is not saved properly, please try again!!"
		  );
		} else {
		  res.send(`Data inserted successfully for ${date}, ${fromTime} to ${toTime}. Thank you for your time!`);
>>>>>>> 76e2345247d8f93559b95f6d138e348fa16bcbbc
		}
	  }
	);
  });
  
// router.post("/postavailabilities", (req, res)=>{
// 	const { availabilityid, username, date, from_time, to_time } = req.body;
// 	db.query("INSERT INTO availabilities (availabilityid, username, date, from_time, to_time) VALUES ($1, $2, $3, $4, $5)", [availabilityid, username, date, from_time, to_time],
// 	(err, result) =>{
// 		if (err){
// 		res.send("Your avilibility is not saved properly, Please try again!!")
// 		}
// 		else{
// 			res.send(`Data inserted succesfully ${username}, ${availabilityid} thank for your time`);

// 		}
// 	})
// });




// const insertQuery = "INSERT INTO availabilities (username, date, from_time, to_time) VALUES ($1, $2, $3, $4);";
// db.query(insertQuery, newAvailability, (error, result) => {
// 	if (error) {
// 		console.error(error);
// 		res.status(500).json({ message: "Internal Server Error" });
// 		return;
// 	}
// 	res.json({ message: "Availability added successfully." });
// });

process.on("SIGTERM", () => server.close(() => disconnectDb()));

connectDb().then(() => server.listen(config.port));
