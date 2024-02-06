const router = require("express").Router();
const courseService = require("../services/courseService")

router.get("/", async (req, res) => {


    const lastCourses = await courseService.getLastCourses().lean()
    res.render("home", { layout: false, lastCourses })
})

module.exports = router