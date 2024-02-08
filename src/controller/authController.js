const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddlewares");
const authService = require("../services/authService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/register", (req, res) => {
    res.render("register", { layout: false })
})

router.post("/register", async (req, res) => {
    try {
        await authService.registerUser(req.body.email, req.body.password, req.body)
        res.redirect("/login")
    } catch (error) {
        let errorMess = getErrorMessage(error)
        res.render(`register`, { layout: false, error: errorMess })
    }
})

router.get("/login", (req, res) => {
    res.render("login", { layout: false })
})

router.post("/login", async (req, res) => {
    try {
        const token = await authService.loginUser(req.body);
        res.cookie("token", token)
        res.redirect("/")
    } catch (error) {
        let errorMess = getErrorMessage(error)
        res.render(`login`, { layout: false, error: errorMess })
    }
})

router.get("/logout", isAuth, (req, res) => {
    res.clearCookie("token");
    res.redirect("/login")
})

router.get("/profile", isAuth, async (req, res) => {
    try {
        const userInformation = await authService.getUserInfo(req.user.userId).populate("createdCourses").populate("signUpCourses").lean();
        res.render("profile", { layout: false, userInformation, createdCourses: userInformation.createdCourses, signedCourses: userInformation.signUpCourses })
    } catch (error) {
        let errorMess = getErrorMessage(error)
        res.render(`404`, { layout: false, error: errorMess })
    }
})



module.exports = router