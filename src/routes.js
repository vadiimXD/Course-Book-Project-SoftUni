const router = require("express").Router();

const staticController = require("./controller/staticController")
const authController = require("./controller/authController")

//app use routes

//EXAMPLE
router.use(staticController)
router.use(authController)



//for other all
router.all("*", (req, res) => {
    res.render("404", { layout: false })
})

module.exports = router