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

router.get("/users/:username", (req, res) => {
	const studentUsername = req.params.username;
    db.query("SELECT * FROM users WHERE username = $1", [studentUsername],
		(err, result) => {
			res.send(result.rows);
		});
});

router.get("/InputAvailabilitiesPage", (req, res) => {
	const newDate = (req.query.date);
	const newFtime = (req.query.from_time);
	const newTotime = (req.query.to_time);
	db.query("SELECT * FROM availabilities WHERE date = $1 and (from_time = $2 or to_time = $3)", [newDate, newFtime, newTotime], (err, result) => {
		res.send(result.rows)

	});
});


router.get("/users", (req, res) => {
	db.query("SELECT * FROM users")
		.then((result) => res.json(result.rows))
		.catch((error) => {
			res.status(500).json(error);
		});
});

router.get("/availabilities", (req, res) => {
	db.query("SELECT * FROM availabilities", (err, result) => {
		res.json(result.rows);
	});
});

process.on("SIGTERM", () => server.close(() => disconnectDb()));

connectDb().then(() => server.listen(config.port));
