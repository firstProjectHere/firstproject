var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//mongoose.connect('mongodb://localhost:27017/socialapp', { useNewUrlParser: true });
//no need to connect again when using second collection in a project


var Message = new Schema({
    created_at: {type: Date, default: Date.now},
    username1: {type:String},
    username2: {type:String},
    msgFrom: {type:String},
    message : {type:String}
});



var msg = mongoose.model('messages', Message);
module.exports= msg;