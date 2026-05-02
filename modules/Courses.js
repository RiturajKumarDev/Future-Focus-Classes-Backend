const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        subcategory: { type: String, required: true },
        level: { type: String, required: true },
        language: { type: String, required: true },
        price: { type: String, required: true },
        thumbnailUrl: String,
        shortDescription: String,
        instructor: String,
        instructorEmail: String,
        grade: String,
        totalDuration: String,
        totalLectures: String,
        rating: String,
        learningObjectives: Array,
        features: Array,
        welcomeMessage: String,
        completionMessage: String,

        createAt: { type: Date, default: Date.now },
    },
);

module.exports = mongoose.model("Course", CourseSchema);
