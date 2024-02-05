const Course = require("../models/Course")


exports.createCourse = (body) => { return Course.create(body) }

exports.getLastCourses = () => { return Course.find().sort({ _id: -1 }).limit(3) }

exports.getAllCourses = () => { return Course.find() }

exports.getCurrentCourse = (id) => { return Course.findById(id) }