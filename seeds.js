var mongoose = require("mongoose");
var Match = require("./models/match");


var data = [
    {
        adress: "Aterro campo 7", 
        time: "20h",
        cellphone: "1234567890", 
        description: "Society"
    },
    {
        adress: "Piraque", 
        time: "21h",
        cellphone: "1234567890", 
        description: "Society"
    },
    {
        adress: "Caiçaras", 
        time: "9h",
        cellphone: "1234567890", 
        description: "Futsal"
    }
]

function seedDB(){
   //Remove all matches
   Match.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed matches!");
         //add a few matches
        data.forEach(function(seed){
            Match.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a match");
                   
                }
            });
        });
    }); 
    
}

module.exports = seedDB;