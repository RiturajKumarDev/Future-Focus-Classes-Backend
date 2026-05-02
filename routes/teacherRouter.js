const express = require("express");
const { getTeachers } = require("../controllers/teacherController");
const teacherRouter = express.Router();

teacherRouter.get("/teachers", getTeachers);

exports.teacherRouter = teacherRouter;
