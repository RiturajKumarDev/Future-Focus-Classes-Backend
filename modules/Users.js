const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        // User
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        avatar: { type: String, required: true },
        joinDate: { type: Date, default: Date.now },
        phone: { type: String, required: true },
        // Student
        batch: String,
        // Teacher
        subject: String,
        experience: String,
        quals: Array,
        bio: String,
    },
);

module.exports = mongoose.model("User", UserSchema);
