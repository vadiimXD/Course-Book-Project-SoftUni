const router = require("express").Router();
//controller woprk with services

router.get("/register", (req, res) => {
    res.render("register", { layout: false })
})

module.exports = router