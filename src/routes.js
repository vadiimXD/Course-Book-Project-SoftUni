const router = require("express").Router();

//here need to be controllers for routing 
//EXAMPLE
const firstController=require("./controller/test1Controller")
const secondController=require("./controller/test2Controller")
const thirdController=require("./controller/test3Controller")


//app use routes

//EXAMPLE
router.use(firstController)
router.use(secondController)
router.use(thirdController)


//for other all
router.all("*", (req, res) => {
    res.send("404")
})

module.exports = router