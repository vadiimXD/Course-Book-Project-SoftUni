const router = require("express").Router();

const staticController=require("./controller/staticController")

//app use routes

//EXAMPLE
router.use(staticController)



//for other all
router.all("*", (req, res) => {
    res.send("404")
})

module.exports = router