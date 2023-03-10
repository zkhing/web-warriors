import { Router } from "express";
import db from "./db"
import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});


router.get("/addavailabilitiesTime", (req, res) => {
	const newusername =[req.body.username, req.body.date, req.body.from_time, req.body.to_time],
	db.query("SELECT * FROM availabilities WHERE date = '05-03-2023'and (from_time = '14:00' or to_time = '15:00');insert into availabeTableName (studentId,date,from,to) values($1,$2,$3,$4) returning *",
	
		(error, result) => {
			res.json({ message: "availabilities Time Added " });
		}
	)
});


export default router;
