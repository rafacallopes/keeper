var express = require("express");
var router  = express.Router();

//home
router.get("/", function(req, res){
          res.render("index/home");
    });

module.exports = router;
