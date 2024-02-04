const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    certificate: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
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