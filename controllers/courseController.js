const fs = require("fs");
const Courses = require("../modules/Courses");

exports.createCourse = async (req, res, next) => {
    const { title, category, subcategory, level, grade, language, price, shortDescription, thumbnailUrl, instructor,instructorEmail, totalDuration, totalLectures, rating, learningObjectives, features, welcomeMessage, completionMessage } = req.body;
    const course = new Courses({ title, category, grade, subcategory, level, language, thumbnailUrl, price, shortDescription, instructor,instructorEmail, totalDuration, totalLectures, rating, learningObjectives, features, welcomeMessage, completionMessage });
    course.save()
        .then(result => {
            return res.status(201).json(course);
        }).catch(error => {
            return res.status(422).json({ "errors": error.errmsg });
        });
};

exports.getCourses = async (req, res, next) => {
    Courses.find()
        .then((courses) => {
            res.status(201).json(courses);
        }).catch((error) => {
            res.status(422).json({ 'errors': error });
        })
};
