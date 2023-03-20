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
	  "INSERT INTO availabilities (date, from_time, to_time) VALUES ($1, $2, $3)",
	  [date, fromTime, toTime],
	  (err, result) => {
		if (err) {
		  res.send(
			"Your availability is not saved properly, please try again!!"
		  );
		} else {
		  res.send(`Data inserted successfully for ${date}, ${fromTime} to ${toTime}. Thank you for your time!`);
		}
	  }
	);
  });
  



process.on("SIGTERM", () => server.close(() => disconnectDb()));

connectDb().then(() => server.listen(config.port));
