const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddlewares");
const courseService = require("../services/courseService")

router.get("/courses", (req, res) => {
    res.render("catalog", { layout: false })
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