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


module.exports = router