const http = require("http");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/keeper");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});


http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));