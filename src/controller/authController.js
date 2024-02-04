const router = require("express").Router();
const authService = require("../services/authService")

router.get("/register", (req, res) => {
    res.render("register", { layout: false })
})

router.post("/register", async (req, res) => {
    try {
        await authService.registerUser(req.body.email, req.body.password, req.body)
        res.redirect("/login")
    } catch (error) {
        console.log(error)
        res.redirect("/404")
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
        res.redirect("/404")
    }
})



module.exports = router