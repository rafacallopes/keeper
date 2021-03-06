var express = require("express");
var router  = express.Router();
var Match = require("../models/match");


//INDEX - show all matches
router.get("/", function(req, res){
    // Get all matches from DB
    Match.find({}, function(err, allMatches){
       if(err){
           console.log(err);
       } else {
          res.render("index/home",{matches:allMatches});
       }
    });
});

//CREATE - add new match to DB
router.post("/", isLoggedIn, function(req, res){
    // get data from form and add to matches array
    var adress = req.body.adress;
    var time = req.body.time;
    var cellphone = req.body.cellphone;
    var desc = req.body.description;
    var caller = {
        id: req.user._id,
        username: req.user.username
    }
    var newMatch = {adress: adress, time: time, cellphone: cellphone, description: desc, caller:caller}
    // Create a new match and save to DB
    Match.create(newMatch, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            console.log(newlyCreated);
            res.redirect("/index");
        }
    });
});

//NEW - show form to create new match
router.get("/new", function(req, res){
   res.render("index/new"); 
});

// DESTROY MATCH ROUTE
router.delete("/:id", function(req, res){
    Match.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/index");
       } else {
           res.redirect("/index");
       }
    });
 });
 
 //MIDDLEWARE - User must be logged in to continue
 function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;
