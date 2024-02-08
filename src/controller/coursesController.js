const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddlewares");
const courseService = require("../services/courseService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/courses", async (req, res) => {
    try {
        const courses = await courseService.getAllCourses().lean()
        res.render("catalog", { layout: false, courses })
    } catch (error) {
        let errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

router.get("/create", isAuth, (req, res) => {
    res.render("create", { layout: false })
})

router.post("/create", isAuth, async (req, res) => {
    const body = req.body;
    body.owner = req.user.userId
    try {
        await courseService.createCourse(body, req.user.userId)
        res.redirect("/")
    } catch (error) {
        let errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

router.get("/details/:courseId", async (req, res) => {
    try {
        let course = await courseService.getCurrentCourse(req.params.courseId).populate("owner").populate("singUpList").lean()
        const isOwner = course.owner._id == req.user?.userId
        let isSigned = courseService.signed(course.singUpList, res.locals.isAuthenticated, req.user.userId);
        let signed = courseService.isSingUpList(course.singUpList)

        res.render("details", { layout: false, course, isOwner, isSigned, signed })
    } catch (error) {
        let errorMess = getErrorMessage(error)
        const lastCourses = await courseService.getLastCourses().lean()
        res.render("home", { layout: false, lastCourses, error: errorMess })
    }
})

router.get("/sign/:courseId", isAuth, async (req, res) => {
    try {
        await courseService.singUp(req.params.courseId, req.user.userId)
        res.redirect(`/details/${req.params.courseId}`)
    } catch (error) {
        let errorMess = getErrorMessage(error)
        res.render(`404`, { layout: false, error: errorMess })
    }
})

router.get("/edit/:courseId", isAuth, async (req, res) => {
    try {
        const course = await courseService.getCurrentCourse(req.params.courseId).lean();
        res.render("edit", { layout: false, course })
    } catch (error) {
        let errorMess = getErrorMessage(error)
        res.render(`404`, { layout: false, error: errorMess })
    }
})

router.post("/edit/:courseId", isAuth, async (req, res) => {
    try {
        await courseService.updateCourse(req.params.courseId, req.body)
        res.redirect(`/details/${req.params.courseId}`)
    } catch (error) {
        let errorMess = getErrorMessage(error)
        res.render(`edit`, { layout: false, course: req.body, error: errorMess })
    }
})

router.get("/delete/:courseId", isAuth, async (req, res) => {
    try {
        await courseService.deleteCourse(req.params.courseId);
        res.redirect("/courses")
    } catch (error) {
        let errorMess = getErrorMessage(error)
        res.render(`404`, { layout: false, error: errorMess })
    }
})

module.exports = router