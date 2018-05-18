const http = require("http");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var mongoose    = require("mongoose");
var flash       = require("connect-flash");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
var User        = require("./models/user");

//requiring routes
var   indexRoutes      = require("./routes/index");
var   keeperRoutes      = require("./routes/keeper");


mongoose.connect("mongodb://localhost/keeper");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(flash());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "keeper",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/keeper", keeperRoutes);

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));