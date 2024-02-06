const express = require("express")
const handlebars = require('express-handlebars');
const path = require('path');
const routes = require("./routes");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

//server config
const app = express();
const { auth } = require("../src/middlewares/authMiddlewares")
const port = 1337;

//view engine confing
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.use(cookieParser())

app.set('view engine', 'hbs');
app.set('views', path.resolve('src/views'));

//express config
app.use(express.static(path.resolve('src/public')));
app.use(express.urlencoded({ extended: false }));
app.use(auth)

//logger
//logger with middleware for all methods and urls
app.use((req, res, next) => {
    console.log(`Someone user sended request with method: "${req.method}" on this URL: "${req.url}"`)
    next()
})

//architecture routes
app.use(routes)


mongoose.connect(`mongodb://localhost:27017/course-book`).then(() => {
    console.log("DB connected successfully")
    app.listen(port, () => console.log(`Server working on port http://localhost:1337/ :)`))
});