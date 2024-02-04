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


module.exports = router