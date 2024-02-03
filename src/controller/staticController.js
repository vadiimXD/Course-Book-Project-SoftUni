const router = require("express").Router();
//controller woprk with services

router.get("/", (req, res) => {
    res.render("home", { layout: false })
})

module.exports = router