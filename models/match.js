var mongoose = require("mongoose");

var matchSchema = new mongoose.Schema({
   adress: String,
   time: String,
   cellphone: String,
   description: String,
   caller: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   
});

module.exports = mongoose.model("Match", matchSchema);