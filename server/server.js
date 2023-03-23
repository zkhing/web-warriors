import http from "http";
import router from "./api";
import db from "./db";
import app from "./app";
import { connectDb, disconnectDb } from "./db";
import config from "./utils/config";
import logger from "./utils/logger";
// import LoginPage from "../client/src/components/LoginPage";

const server = http.createServer(app);
require("dotenv").config();

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	logger.info("listening on: %s", bind);
});


// LoginPage endpoint

router.get("/users/:username", (req, res) => {
	const studentUsername = req.params.username;
	db.query(
		"SELECT * FROM users WHERE username = $1",
		[studentUsername],
		(err, result) => {
			res.send(result.rows);
		}
	);
});

router.get("/InputAvailabilitiesPage", (req, res) => {
	const newDate = req.query.date;
	const newFtime = req.query.from_time;
	const newTotime = req.query.to_time;
	db.query(
		"SELECT * FROM availabilities WHERE date = $1 and (from_time = $2 or to_time = $3)",
		[newDate, newFtime, newTotime],
		(err, result) => {
			res.send(result.rows);
		}
	);
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
	  "INSERT INTO availabilities (username,date, from_time, to_time) VALUES ($1, $2, $3,$4)",
	  [username, date, fromTime, toTime],
	  (err, result) => {
		if (err) {
		  res.send(
			"Your availability is not saved properly, please try again!!"
		  );
		} else {
		  res.send(`Data inserted successfully for ${username} ,${date}, ${fromTime} to ${toTime}. Thank you for your time!`);
		}
	  }
	);
  });
// Matching availability student 

router.get("/matchingAvailabilities", (req, res) => {
	const {date, from_time, to_time} = req.body
	db.query("SELECT users.first_name, users.surname, users.email, availabilities.date, availabilities.from_time, availabilities.to_time FROM users INNER JOIN availabilities ON users.username = availabilities.username WHERE date = $1 and (from_time = $2 or to_time = $3);", [date, from_time, to_time], (err, result) => {
if ( err) {
	res.send("Check your input and try again!!")
}
else{
	res.send(result.rows)
}
	});
});
  
// DELETE
router.delete("/deleteAvailability", (req, res) => {
    const { username, date, fromTime, toTime } = req.body;
    db.query(
      "DELETE FROM availabilities WHERE username = $1 AND date = $2 AND from_time = $3 AND to_time = $4",
      [username, date, fromTime, toTime],
      (err, result) => {
        if (err) {
          res.send("Failed to delete availability, please try again!");
        } else {
          res.send(`Availability for ${username}, ${date}, ${fromTime} to ${toTime} has been deleted successfully.`);
        }
      }
    );
  });

process.on("SIGTERM", () => server.close(() => disconnectDb()));

connectDb().then(() => server.listen(config.port));
