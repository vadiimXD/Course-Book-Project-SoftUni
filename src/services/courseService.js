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

exports.updateCourse = (id, course) => {
    if (!course.title || !course.type || !course.certificate || !course.image || !course.description || !course.price) {
        throw new Error("empty fields")
    }
    const regex = /^https?:\/\//
    const isValid = course.image.match(regex);

    if (!isValid) {
        throw new Error("invalid url")
    }

    if (course.price < 0) {
        throw new Error("invalid price")
    }

    return Course.findByIdAndUpdate(id, course)
}