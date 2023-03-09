import { Router } from "express";
import db from "./db"
import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.post("/addAvailabeTime", (req, res) => {
	logger.debug("Add Availabe Time");
	db.query("insert into availabeTableName (studentId,date,from,to) values($1,$2,$3,$4) returning *",
		[req.body.studentId, req.body.date, req.body.from, req.body.to],
		(error, result) => {
			res.json({ message: "Availabe Time Added " });
		}
	)
});

export default router;
