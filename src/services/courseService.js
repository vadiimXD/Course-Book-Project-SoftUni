const Course = require("../models/Course")
const User = require("../models/User")


exports.createCourse = async (body, userId) => {
    await Course.create(body)
    const course = await Course.findOne({ title: body.title })
    await User.findByIdAndUpdate(userId, { $push: { createdCourses: course._id } })
    return
}

exports.getLastCourses = () => { return Course.find().sort({ _id: -1 }).limit(3) }

exports.getAllCourses = () => { return Course.find() }

exports.getCurrentCourse = (id) => { return Course.findById(id) }

exports.singUp = async (courseId, userId) => {
    await Course.findByIdAndUpdate(courseId, { $push: { singUpList: userId } })
    await User.findByIdAndUpdate(userId, { $push: { signUpCourses: courseId } })
    return
}

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

exports.deleteCourse = (id) => { return Course.findByIdAndDelete(id) }