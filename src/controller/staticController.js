const router = require("express").Router();
const courseService = require("../services/courseService")

router.get("/", async (req, res) => {
    try {
        const lastCourses = await courseService.getLastCourses().lean()
        res.render("home", { layout: false, lastCourses })
    } catch (error) {
        let errorMess = getErrorMessage(error)
        res.render(`404`, { layout: false, error: errorMess })
    }
})

module.exports = router