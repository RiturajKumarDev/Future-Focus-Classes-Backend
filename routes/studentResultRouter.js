const express = require("express");
const studentResultRouter = express.Router();
const { saveResult, getResults } = require("../controllers/studentResultController");

studentResultRouter.post("/saveResult", saveResult);
studentResultRouter.get("/getResults", getResults);

exports.studentResultRouter = studentResultRouter;
