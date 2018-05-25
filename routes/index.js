var express = require("express");
var router  = express.Router();
var Partida = require("../models/partida");

//home
router.get("/", function(req, res){
          res.render("index/home");
    });

module.exports = router;

//INDEX - show all partidas
router.get("/", function(req, res){
    // Get all partidas from DB
    Partida.find({}, function(err, allPartidas){
       if(err){
           console.log(err);
       } else {
          res.render("index/home",{patidas:allPartidas});
       }
    });
});

//CREATE - add new partida to DB
router.post("/", isLoggedIn, function(req, res){
    // get data from form and add to partidas array
    var adress = req.body.adress;
    var time = req.body.time;
    var cellphone = req.body.cellphone;
    var desc = req.body.description;
    var caller = {
        id: req.user._id,
        username: req.user.username
    }
    var newPartida = {adress: adress, time: time, cellphone: cellphone, description: desc, caller:caller}
    // Create a new partida and save to DB
    Partida.create(newPartida, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            console.log(newlyCreated);
            res.redirect("/index/home");
        }
    });
});

//NEW - show form to create new partida
router.get("/new", isLoggedIn, function(req, res){
   res.render("index/new"); 
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}



module.exports = router;
