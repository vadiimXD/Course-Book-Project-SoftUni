const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdCourses: [{
        type: mongoose.Types.ObjectId,
        ref: "Course"
    }],
    signUpCourses: [{
        type: mongoose.Types.ObjectId,
        ref: "Course"
    }]
})


const User = mongoose.model("User", userSchema)

module.exports = User;