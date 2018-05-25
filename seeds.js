var mongoose = require("mongoose");
var Partida = require("./models/partida");


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
   //Remove all partidas
   Partida.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed partidas!");
         //add a few partidas
        data.forEach(function(seed){
            Partida.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a partida");
                   
                }
            });
        });
    }); 
    
}

module.exports = seedDB;