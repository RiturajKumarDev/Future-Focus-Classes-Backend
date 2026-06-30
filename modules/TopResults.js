const mongoose = require("mongoose");

const TopResultSchema = new mongoose.Schema(
    {
        studentName: { type: String, required: true },
        rollNumber: { type: String, required: true },
        batch: { type: String, required: true },
        schoolName: { type: String, required: true },
        score: { type: String, required: true },
        icon: { type: String, default: '🥇' },
        uploadDate: { type: Date, default: Date.now },
    },
);

module.exports = mongoose.model("TopResult", TopResultSchema);
