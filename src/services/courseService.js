const Course = require("../models/Course")


exports.createCourse = (body) => { return Course.create(body) }