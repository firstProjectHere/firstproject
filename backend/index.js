 var express = require('express');
 app= express();
 var bodyParser= require('body-parser');
 var path = require('path');
 var mongoose = require('mongoose');
 var User = require('./dataBaseHere');
 var Posts = require('./postDBhere');
 var Messages = require('./chatMessages');
 var server = require('http').createServer(app);
 var fileRoutes = require('./file');
 
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });


app.use('/file', fileRoutes);

app.post('/login', function(req, res){
    res.setHeader('Access-control-Allow-Origin','*');
    var username = req.body.username;
    var password = req.body.password;

    User.find({username: username, password:password}, function(err, userlogin){
        if(err){
            console.log('There was an error while user login');
            res.json({error:true});
            //res.sendStatus(500);
        }
         if(userlogin.length == 0){
            res.json({error:true, access:"denied"});
            console.log("user not found");
        }
        if(userlogin.length > 0){
            res.json({error:false, access:"granted", message:userlogin});
            console.log("user logged in!"); 
        }
    });
    //res.end();
});

    // Registering user here 
app.post('/register', function(req, res){
    res.setHeader('Access-control-Allow-Origin','*');
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var password = req.body.password;
    
    var user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.username = username;
    user.password = password;

    user.save(function(err, userregistered){
        if(err){
            console.log('There was an error while registering the user');
            res.sendStatus(500);
        }
        else if(userregistered){
            console.log('user registered successfully');
        }
    });
    res.end();
});
    // searching user here
app.post('/finduser', function(req,res){
    res.setHeader('Access-control-Allow-Origin','*');
    var findUser = req.body.searchuser;
        console.log("request for search user in backend ", findUser);
            User.find({username: findUser}, function(err, searchedUserDetail){
                if(err){
                    console.log('error while searching user', err);
                    res.json({error:true});
                }
                else if(searchedUserDetail.length == 0){
                    console.log("in backend>>>>>>no user found");
                    res.json({error:true, message:"No user found"});
                }
                else if(searchedUserDetail.length > 0){
                    console.log("in backend>>>>user found");
                    res.json({error:false, message:searchedUserDetail});
                }
                res.end();
             });
        // res.end();
});
    //sending request here
app.post('/confirmrequest', function(req,res){
    res.setHeader('Access-control-Allow-Origin','*');
    console.log('confirm request backend>>>>>> ',req.body);
    myname = req.body.myname;
    username = req.body.username;
    console.log('my name is ', myname, ' and user name is ', username);
    User.update({username: username}, {$push: {pendingrequest: myname}}, function(err, entryDoneToPendingRequest){
        if(err){
            console.log("error while confirming request", err);
            res.json({error:true});
        }
        else if(entryDoneToPendingRequest){
            res.json({error:false, message:entryDoneToPendingRequest});
        }      
        res.end();  
    });    
});
    //declining user's request here
app.post('/decline', function(req,res){
    res.setHeader('Access-control-Allow-Origin','*');
    console.log('request to decline in backend>>>', req.body);
    me = req.body.me;
    friend = req.body.friend;
    console.log("me ", me , "friend ", friend);
    User.update({username: me}, {$pull: {pendingrequest: friend}}, function(err, userDecline){
        if(err){
            console.log("error while declining friend request", err);
            res.json({error:true});
        }
        else if(userDecline){
            console.log("request declined successfully", userDecline);
            res.json({error: false, message:"request has been declined"})
            res.end();
        }
    });
});
    //friend request accepting here
app.post('/confirmuserrequest', function(req,res){
    res.setHeader('Access-control-Allow-Origin','*');
    console.log('you made it in confirm>>>>>>>>>backend', req.body);
    me = req.body.me;
    friend = req.body.friend;
    console.log("me ", me , "friend ", friend);
    User.update({username: me}, {$push: {myfriends: friend}}, function(err, friendAddedToMe){
        if(err){
            console.log("error while adding friend in my friend list", err);
            res.json({error:true});
        }
        else if(friendAddedToMe){
            console.log("friend added to my friend list", friendAddedToMe);
            User.update({username: friend}, {$push: {myfriends: me}}, function(err, meAddedToFriend){
                if(err){
                    console.log("error while adding me into my friend list", err);
                    res.json({error:true});
                }
                else if(meAddedToFriend){
                    console.log("me also added to my friend list", meAddedToFriend);
                    //res.json({error: false, message:"both are added into friend list"});
                    //res.end()
                    User.update({username: me}, {$pull: {pendingrequest: friend}}, function(err, removeFriendFromPendinglist){
                        if(err){
                            console.log("error while removing friend from my pending list", err);
                            res.json({error:true});
                        }
                        else if(removeFriendFromPendinglist){
                            console.log("everything done for confirming request", removeFriendFromPendinglist);
                            res.json({error: false, message:"everything done for confirming request"});
                            res.end()
                        }
                    });
                }
            });
        }
    });
});

app.post('/unfriendUser', function(req,res){
    res.setHeader('Access-control-Allow-Origin','*');
    console.log("backend>>>unfriend", req.body);
    me = req.body.me;
    friend = req.body.friend;
    console.log("me is ", me , "friend is ", friend);
    User.update({username: me}, {$pull: {myfriends: friend}}, function(err, unfriendUser){
        if(err){
            console.log("error while unfriend user from my friend list", err);
            res.json({error:true});
        }
        else if(unfriendUser){
            console.log("user unfriend for me", unfriendUser);
            User.update({username: friend}, {$pull: {myfriends: me}}, function(err, unfriendMe){
                if(err){
                    console.log("error while unfriend me from user friend list", err);
                    res.json({error:true});
                }
                else if(unfriendMe){
                    console.log("everything done for unfriend", unfriendMe);
                    res.json({error: false, message:"everything done for unfriend"});
                    res.end()
                }
            });
        }
    });
});

app.post('/showpendingrequest', (req,res)=>{
    res.setHeader('Access-control-Allow-Origin','*');
    console.log("request reached to node", req.body);
    me = req.body.me;
    User.aggregate([{$match: {username: me}}, {$project: {_id: 0, pendingrequest: 1}}], function(err, pendingList){
        //console.log("this is pending list", pendingList);
                if(err){
                    console.log("error while showing pending friends list", err);
                    res.json({error:true});
                }
                else if(pendingList){
                    console.log("pending list projection successful", pendingList);
                    res.json({error: false, message:pendingList});
                    res.end()
                }
    });
});

app.post('/friendlist', function(req, res){
    res.setHeader('Access-control-Allow-Origin','*');
    console.log("request reached friendllist in node", req.body);
    me = req.body.me;
    User.aggregate([{$match: {username: me}}, {$project: {_id: 0, myfriends: 1}}], function(err, friendList){
        //console.log("my friends array is ", friendList);
                if(err){
                    console.log("error while showing friends list", err);
                    res.json({error:true});
                }
                else if(friendList){
                    console.log("friend list projection successful", friendList);
                    res.json({error: false, message:friendList});
                    res.end()
                }
    });
});

app.post('/postUpload', function(req, res){
    res.setHeader('Access-control-Allow-Origin','*');
    console.log("backend for post", req.body);
    var post = req.body.postdata;
    var username = req.body.username;
    var access = req.body.access;
    var post = new Posts({
        username: username,
        post_desc: post,
        access: access
    });
    post.save(function(err, postUploaded){
        if(err){
            console.log("error while uploading post", err);
            res.json({error:true});
        }
        else if(postUploaded){
            console.log('post uploaded');
            res.json({error: false, message:postUploaded});
            res.end()            
        }
    });

});

app.post('/showpost', function(req, res){
    res.setHeader('Access-control-Allow-Origin','*');
   // console.log("show post in backend", req.body);
    let me = req.body.me;
    messageArray= [];
    friends= [];
    post = [];
    friendsholder = [];

    Posts.find({}).limit(500).exec(function(err, data){
        if(err){
            console.log("error fetching all posts", err);
            res.json({error:true});
        }
        
        else if(data){
            //console.log("posts that are found ", data);
            User.aggregate([{$match: {username: me}}, {$project: {_id: 0, myfriends: 1}}], function(err, data2){
                if(err){
                    console.log("error fetching all posts", err);
                    res.json({error:true});
                }

                else if(data2){
                    friendsholder = data2[0].myfriends;
                    //console.log("here i found ", friendsholder);
                    //console.log(data);

                    for(let i=0; i<data.length; i++){
                        if(data[i].access == 'public'){
                            post.push({username:data[i].username, post_desc:data[i].post_desc, created_at:data[i].created_at, access:data[i].access});
                        }
                    }

                    // console.log("these are public posts ", post);

                    for(let i=0; i<friendsholder.length; i++){
                        for(let j=0; j<data.length; j++){
                            if(friendsholder[i] == data[j].username){
                                if(data[j].access == 'friend'){
                                    post.push({username:data[j].username, post_desc:data[j].post_desc, created_at:data[j].created_at, access:data[j].access});
                                }
                            }
                        }
                    }

                    // console.log("these are public + friends posts ", post);

                    for(let i=0; i<data.length; i++){
                        if(me == data[i].username){
                            if(data[i].access == 'private'){
                                post.push({username:data[i].username, post_desc:data[i].post_desc, created_at:data[i].created_at, access:data[i].access});
                            }
                        }
                    }

                    // console.log("these are public+friends+ my private posts ", post);

                    for(let i=0; i<data.length; i++){
                        if(me == data[i].username){
                            if(data[i].access == 'friend'){
                                post.push({username:data[i].username, post_desc:data[i].post_desc, created_at:data[i].created_at, access:data[i].access});
                            }
                        }
                    }

                    console.log("these are public + friends + my(private + friends) posts", post);

                    function compare(a, b){
                        if(a.created_at < b.created_at)
                            return 1;
                        if(a.created_at > b.created_at)
                            return -1;
                        return 0;
                    }

                    post.sort(compare);

                  //  console.log(post);

                    if(post.length == 0){
                        res.json({error: false, value:0, message:"No posts Found"});
                    }
                    else{
                       // console.log("Before sending ",post);
                        res.json({error: false, value:1, message:"Posts Found" , data:post});
                        res.end()
                    }
                }
            });
        }
    });
});

    // Posts.find({}).limit(10).exec(function(err, allPosts){
    //     if(err){
    //         console.log("error fetching all posts", err);
    //         res.json({error:true});
    //     }
    //     else if(allPosts){
    //         User.aggregate([{$match: {username: me1}}, {$project: {_id: 0, myfriends: 1}}], function(err, friends){
    //             if(err){
    //                 console.log("error fetching all posts", err);
    //                 res.json({error:true});
    //             }
    //             else if(friends){
    //                 friendsholder = friends[0].myfriends;
    //                 console.log(friendsholder);


    //                 for( let i = 0; i < allPosts.length; i++){
    //                     if(allPosts[i].access == 'public'){
    //                         post.push({username:allPosts[i].username, post_desc:allPosts[i].post_desc, created_at:allPosts[i].created_at, access:allPosts[i].access})
    //                     }
    //                 }
    //                 //console.log(post);

    //                 //fetching friends posts

    //                 for( let i = 0; i < friends.length; i++){
    //                     for( let j = 0; j< allPosts.length; j++){
    //                         if(friendsholder[i] == allPosts[j].username){
    //                             if(allPosts[j].access == 'friend'){
    //                                 post.push({username:allPosts[j].username, post_desc:allPosts[j].post_desc, created_at:allPosts[j].created_at, access:allPosts[j].access})
    //                                 console.log(post);
    //                             }
    //                         }                           
    //                     }
    // //                 }

                    
    //             //console.log(post);
    //             //consists of public and friends posts..........

    //             //fetching " me " private posts

    //               for( let i = 0; i < allPosts.length; i++){
    //                 if(me1 == allPosts[i].username){
    //                     if(allPosts[i] == 'private'){
    //                         post.push({username:allPosts[i].username, post_desc:allPosts[i].post_desc, created_at:allPosts[i].created_at, access:allPosts[i].access});
    //                     }
    //                  }   
    //               }  
    //             //   console.log(post);
    //             }



    //         });
    //     }
    // });

    // Posts.find({access: "public"}, function(err, postPublic){
    //     if(err){
    //         console.log("error fetching public post", err);
    //         res.json({error:true});
    //     }
    //     else if(postPublic){
    //         postPublic.forEach(function(public){
    //             messageArray.push(public);    
    //         });
            
    //         Posts.find({username: me, access: "private"}, function(err, postPrivate){
    //             if(err){
    //                 console.log("error fetching private post", err);
    //                 res.json({error:true});
    //             }
    //             else if(postPrivate){
    //                 postPrivate.forEach(function(private){
    //                     messageArray.push(private);
    //                 });
                   

    //                 User.aggregate([{$match: {username: me}}, {$project: {_id: 0, myfriends: 1}}], function(err, myFriends){
    //                     if(err){
    //                         console.log("error fetching private post", err);
    //                         res.json({error:true});
    //                     }
    //                     else if(myFriends){
    //                         let a = myFriends[0].myfriends;
    //                         a.forEach(function(friend){
    //                             Posts.find({username: friend, access: "friend"}, function(err, postFriends){
    //                                 if(err){
    //                                     console.log("error fetching friends post", err);
    //                                     res.json({error:true});
    //                                 }
    //                                 else if(postFriends){
    //                                     postFriends.forEach(function(friends){
    //                                         messageArray.push(friends);
    //                                     });
                                        
    //                                     //messages=messageArray.sort(function(a, b){return b.created_at - a.created_at});
    //                                         console.log(messageArray);
    //                                 }
    //                             });
    //                         });
    //                     }
    //                 });

    //             }
    //         });
    //     }
    // });


app.post('/chatfriends', function(req, res){
    res.setHeader('Access-control-Allow-Origin','*');
    // console.log("chat friends list backend ", req.body);
    me = req.body.me;
    User.aggregate([{$match: {username: me}}, {$project: {_id: 0, myfriends: 1}}], function(err, friendList){
        //console.log("my friends array is ", friendList);
                if(err){
                    console.log("error while showing friends list", err);
                    res.json({error:true});
                }
                else if(friendList){
                    console.log("friend list projection successful", friendList);
                    res.json({error: false, message:friendList});
                    res.end()
                }
    });
});

app.post('/storeMessage', function(req, res){
    res.setHeader('Access-control-Allow-Origin','*');
    // console.log("finally reached in backed ", req.body);
    myName = req.body.myName;
    friendName = req.body.friendName;
    msg = req.body.message1;
    //console.log(myName, "have send ", msg, " to ", friendName);
    var messages = new Messages({
        username1: myName,
        username2: friendName,
        msgFrom: myName,
        message: msg
    });

    messages.save(function(err, messageSaved){
        if(err){
            console.log("error while showing friends list", err);
            res.json({error:true});
        }
        else if(messageSaved){
            console.log("message saved successfully", messageSaved);
            res.json({error: false, message: "message stored", data: messageSaved});
            res.end()
        }
    });
});


app.post('/renderMsg', function(req, res){
    res.setHeader('Access-control-Allow-Origin','*');
    console.log("fnally reached backend ", req.body);
    myName = req.body.myName;
    friendName = req.body.friendName;

    Messages.find({$or: [{username1: myName, username2: friendName},{username1: friendName, username2: myName}]}, function(err, messagesFetched){
        if(err){
            console.log("error while fetching messages", err);
            res.json({error:true});
        }
        else if(messagesFetched){
            console.log("messages fetched", messagesFetched);
            res.json({error: false, message: "messages fetched", data: messagesFetched});
            res.end()
        }
    });
});

    //searching for friend here
app.post('/findfriend', function(req, res){
    res.setHeader('Access-control-Allow-Origin','*');
    name = req.body.searchuser;
    console.log("in backend", name);
    User.find({username: name}, function(err, findfriend){
        if(err){
            console.log('error while searching user', err);
            res.json({error:true});
        }
        else if(findfriend.length == 0){
            console.log("in backend>>>>>>no user found");
            res.json({error:false, message:"No user found", value:0});
        }
        else if(findfriend.length > 0){
            console.log("in backend>>>>user found", findfriend[0].username);
            res.json({error:false, message:findfriend[0].username, value:1});
        }
        res.end();
     });
});


var io = require('socket.io').listen(server);

io.on('connection',(socket)=>{

    console.log('new connection made.');


    socket.on('join', function(data){
      //joining
      socket.join(data.room);

      console.log(data.user + 'joined the room : ' + data.room);

      socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
    });


    socket.on('leave', function(data){
    
      console.log(data.user + 'left the room : ' + data.room);

      socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

      socket.leave(data.room);
    });

    socket.on('message',function(data){
        //store data
      io.in(data.room).emit('new message', {user:data.user, message:data.message});
    })
});

server.listen(3000, function(){
     console.log('server is running at 127.0.0.1:3000 test line')
});
