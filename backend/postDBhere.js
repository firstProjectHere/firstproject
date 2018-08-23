var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//mongoose.connect('mongodb://localhost:27017/socialapp', { useNewUrlParser: true });
//no need to connect again when using second collection in a project


var Post = new Schema({
    username: {type:String},
    access: {type:String, default: "private"},
    post_desc: {type:String},
    post_img: {type:String, default: "N/A"},
    created_at: {type: Date, default: Date.now},
    like: {type:String, default: 0},
    comment: {type:String, default: 0},
    shared: {default: 0}
});



var post = mongoose.model('posts', Post);
module.exports= post;