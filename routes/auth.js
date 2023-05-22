var express          =require("express");
var router           =express.Router();
var passport         =require("passport");
var User            =require("../models/user");


router.get('/users', function(req, res) {
    console.log(req.body)
    res.json({ currentUser: req.user });
});
// router.get("/register",function(req,res){
//     res.render("register");
// });



router.get("/register",function(req,res){  //use post method
    var name=req.query.name;
    var sname=req.query.sname;
    var email_id=req.query.email_id;
    var username=req.query.username;
    var password=req.query.password;
    let alert = require('alert');
    var passCheck= false;
    var usernameCheck=false;
    
    if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/).test(password)){
        alert('Choose a strong password! Password should contain at least 1 number and a special charcter and should be at least 6 characters long.');
        
    }
    else{
        passCheck=true;
    }
    if(!(/^[a-zA-Z0-9]+$/i).test(username)){
        alert('Username should contain only alphabets and numbers!');
    }else{
        usernameCheck=true;
    }
    if(passCheck && usernameCheck){
        var newBooking=new User({name:name,sname:sname,email_id:email_id,username:username});
    }
    User.register(newBooking,password,function(err,user){

    
    if(err){
        console.log(err)
        return res.render("register")
    }
        console.log(user)      
        passport.authenticate("local")(req,res,function(){
            res.redirect("/");
           
        });
        
    
    });

    });


router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/register"
}) ,function(req,res){});

router.get("/logout",function(req,res){
    
    req.logout(function(err){
    if(err){
        return next(err);
    }
    });
    res.redirect("/");
  
});



module.exports=router;