const express = require("express");
const courseRouter = express.Router();
const { createCourse, getCourses } = require("../controllers/courseController");

courseRouter.post("/createCourse", createCourse);
courseRouter.get("/courses", getCourses);

exports.courseRouter = courseRouter;
