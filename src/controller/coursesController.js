const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddlewares");
const courseService = require("../services/courseService")

router.get("/courses", async (req, res) => {
    const courses = await courseService.getAllCourses().lean()
    res.render("catalog", { layout: false, courses })
})

router.get("/create", isAuth, (req, res) => {
    res.render("create", { layout: false })
})

router.post("/create", isAuth, async (req, res) => {
    const body = req.body;
    body.owner = req.user.userId
    try {
        await courseService.createCourse(body)
        res.redirect("/")
    } catch (error) {
        res.redirect("/404")
    }
})

router.get("/details/:courseId", async (req, res) => {
    let course = await courseService.getCurrentCourse(req.params.courseId).populate("owner").populate("singUpList").lean()
    const isOwner = course.owner._id == req.user?.userId
    let isSigned = courseService.signed(course.singUpList, res.locals.isAuthenticated, req.user.userId);
    let signed = courseService.isSingUpList(course.singUpList)

    res.render("details", { layout: false, course, isOwner, isSigned, signed })
})

router.get("/sign/:courseId", async (req, res) => {
    console.log(req.params.courseId)
    console.log(req.user)

    await courseService.singUp(req.params.courseId, req.user.userId)

    res.redirect(`/details/${req.params.courseId}`)
})

router.get("/edit/:courseId", async (req, res) => {
    const course = await courseService.getCurrentCourse(req.params.courseId).lean();
    res.render("edit", { layout: false, course })
})

router.post("/edit/:courseId", async (req, res) => {
    try {
        await courseService.updateCourse(req.params.courseId, req.body)
        res.redirect(`/details/${req.params.courseId}`)
    } catch (error) {
        res.render(`edit`, { layout: false, course: req.body, error: error.message })
    }

})
module.exports = router