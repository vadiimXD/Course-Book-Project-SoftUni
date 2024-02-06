const Course = require("../models/Course")


exports.createCourse = (body) => { return Course.create(body) }

exports.getLastCourses = () => { return Course.find().sort({ _id: -1 }).limit(3) }

exports.getAllCourses = () => { return Course.find() }

exports.getCurrentCourse = (id) => { return Course.findById(id) }

exports.singUp = async (courseId, userId) => { return Course.findByIdAndUpdate(courseId, { $push: { singUpList: userId } }) }

exports.signed = (singUpList, isAuth, userId) => {

    if (isAuth) {
        return singUpList.filter(x => x._id == userId)
    }

    return false
}

exports.isSingUpList = (signUpList) => {
    let signed = []
    if (signUpList) {
        for (const people of signUpList) {
            signed.push(people.email)
        }

        return signed = signed.join(", ")
    }

    return []
}