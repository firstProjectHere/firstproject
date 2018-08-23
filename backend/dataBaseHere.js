var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/socialapp', { useNewUrlParser: true });

var User = new Schema({
  firstname: { type:String, required:true },
  lastname: { type:String, required:true },
  username: { type:String, required:true },
  password: { type:String, required:true },
  pendingrequest: {type:Array},
  myfriends: {type:Array},
  dp: {type:String}
});

var Bhai = new Schema({
  firstname: { type:String, required:true },
  lastname: { type:String, required:true },
 
});


var user = mongoose.model('userinfos', User);
module.exports= user;