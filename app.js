const http = require("http");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var mongoose    = require("mongoose");
var flash       = require("connect-flash");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
methodOverride = require("method-override"),
var User        = require("./models/user");

//requiring routes
var   authRoutes      = require("./routes/auth");
var   indexRoutes      = require("./routes/index");
var   matchRoutes      = require("./routes/match");
var   walletRoutes      = require("./routes/wallet");
var   faqRoutes               = require("./routes/faq");
var   profileRoutes      = require("./routes/profile");


mongoose.connect("mongodb://localhost/appdatabase");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
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

app.use("/", authRoutes);
app.use("/index", indexRoutes);
app.use("/match", matchRoutes);
app.use("/wallet", walletRoutes);
app.use("/faq", faqRoutes);
app.use("/profile", profileRoutes);

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));