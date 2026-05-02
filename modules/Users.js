const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        // User Details
        userType: { type: String, required: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: String, required: true },
        dob: { type: String, required: true },
        gender: { type: String, required: true },
        password: { type: String, required: true },
        image: { type: String, default: "👨‍🏫" },

        // For Student
        parentName: String,
        parentMobile: String,
        classTh: String,

        // For Teacher
        qualification: String,
        experience: String,
        specialization: String,
        teachingSubjects: Array,
        resume: String,
        bio: String,

        // Address
        address: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },

        joinDate: { type: Date, default: Date.now },
    },
);

module.exports = mongoose.model("User", UserSchema);
