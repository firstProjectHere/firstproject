var express = require("express");
var _router = express.Router();
var bodyParser= require('body-parser');
var multer = require("multer");
var path = require("path");
var mongoose = require('mongoose');
 var User = require('./dataBaseHere');

 _router.use(bodyParser.json());
 _router.use(bodyParser.urlencoded({
	extended: true
}));

_router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
var store = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './public/uploads');
    },
    filename:function(req, file, cb){
        cb(null, Date.now() + '.' + file.originalname);
    }
});

// Public Folder
_router.use(express.static(path.join(__dirname, 'public/uploads')));
// _router.use(express.static('./public'));

var upload = multer({storage: store}).single('file');

_router.post('/upload', function(req, res){
    // console.log("name is ", req.body);
    upload(req, res, function(err){
        uname = req.body.firstname;
        if(err){
            console.log("error while uploading image ");
        }
        //console.log("image request in the backend and name and image name is ", uname);
        //console.log("image name is ", req.file.filename);`
        // dp  = req.file.filename;
        pic = path.join(__dirname, './public/uploads') + '/' + req.file.filename;
        console.log("pic path is>>>>>>>>>>>>>>>>>>>>>>>>>> ", pic);
        User.update({firstname: uname}, {$set: {dp: pic}}, (err, imgStored)=>{
            if(err){
                console.log("error while updating image in db ", err)
            }
            else if(imgStored){
                console.log("image stored successfully");
                res.json({originalname: req.file.originalname, uploadname: req.file.filename});
            }
        });
        // console.log("found no error while image uploading");
        // res.json({originalname: req.file.originalname, uploadname: req.file.filename});
    });
});

    //fetching image ( here i have issue )
_router.post('/dp', function(req, res){
    res.setHeader('Access-control-Allow-Origin','*');
    console.log("username is ", req.body);
    User.aggregate([{$match: {firstname: req.body.me}}, {$project: {_id: 0, dp: 1}}], (err, imgFetching) => {
        if(err){
            console.log("error while fecthing image ", err)
        }
        else if(imgFetching.length == 0){
            console.log("img not foung in database");
        }
        else if(imgFetching.length > 0){
            // console.log("img found>>>>>>>>>>>>>>>>>>>> ", imgFetching);
            imgName = imgFetching[0].dp;
            res.json({error: false, imagePath: imgName});
        }
        res.end();
    });
});


module.exports = _router;