const express = require("express");
const studentRouter = express.Router();

const { getStudent } = require("../controllers/studentController");

// Read
studentRouter.get("/userDetails/:_id", getStudent);

// Write 


exports.studentRouter = studentRouter;
