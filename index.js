const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const connectMongodb = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const markRoute = require("./routes/mark");
const authRoute = require("./routes/auth");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

const MONGODB_URI = "mongodb+srv://pyaesonekhant:Py@esonekh@nt27@cluster0-3wttr.mongodb.net/SMMS";
const store = new connectMongodb({
    uri : MONGODB_URI,
    collection : "session"
})

app.use(session({
    secret : "Students' Marks Management System",
    resave : false,
    saveUninitialized : false,
    store : store
}))

app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
})

app.use("/", markRoute);
app.use(authRoute);

app.use((req, res, next) => {
    res.status("404").render("404", {
        title : "404",
        path : "/404"
    });
})

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
.then(result => {
    app.listen(3000, () => console.log("Server is running"))
})