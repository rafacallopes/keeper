var express = require("express");
var router  = express.Router();

//home
router.get("/", function(req, res){
          res.render("wallet/wallet");
    });

module.exports = router;
