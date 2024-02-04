const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
    },
    type: {
        type: String,
        required: true,
        minLength: 3,
    },
    certificate: {
        type: String,
        required: true,
        minLength: 2,
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//, "invalid url"],
    },
    description: {
        type: String,
        required: true,
        minLength: 10,

    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    singUpList: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

const Course = mongoose.model("Course", CourseSchema)

module.exports = Course;