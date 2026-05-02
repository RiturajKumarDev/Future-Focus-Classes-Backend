const mongoose = require("mongoose");

const StudentResultsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        achievement: { type: String, required: true },
        course: { type: String, required: true },
        before: { type: String, required: true },
        after: { type: String, required: true },
        image: { type: String, default: "👨‍🎓" },
        testimonial: { type: String, required: true },
        year: { type: String, required: true },

        uploadDate: { type: Date, default: Date.now },
    },
);

module.exports = mongoose.model("StudentResults", StudentResultsSchema);
