var express          =require("express");
var router           =express.Router();
var Booking           =require("../models/booking");
var User             =require("../models/user")
var middleware       =require("../middleware/middleware");  
var fs = require('fs');
let alert = require('alert');

router.get("/booking/new",middleware.isLoggedIn,function(req,res){
  
fs.readFile('./bus.json', 'utf8', function (err, data) {
  if (err) throw err;
  var obj = JSON.parse(data);

    res.render("book",{d:obj});
});

});
router.post("/booking",function(req,res){
    
    var bus=req.body.bus;
    var date=req.body.date;
    var dept=req.body.dept;
    var arr=req.body.arr;
    var from=req.body.from;
    var to=req.body.to;
    var num_ppl=req.body.num_ppl;
    var cost=100*num_ppl;
    var owner={
    id:req.user._id,
    username:req.user.username
    }
    if((/^[a-zA-Z\s]*$/).test(from) && (/^[a-zA-Z\s]*$/).test(to) && (/^[0-9]*$/).test(num_ppl)){

    var newBooking={bus:bus,date:date,from:from,to:to,num_ppl:num_ppl,cost:cost,owner:owner}
    
    
    Booking.create(newBooking,function(err,newlyCreated){

    
    if(err){
        console.log("error")
    }
    else{
       
        console.log(newlyCreated);
        res.send('<html><body> <h1>Booking summary</h1>'+newlyCreated.bus+newlyCreated.date+newlyCreated.from+newlyCreated.to+newlyCreated.num_ppl+newlyCreated.cost+'</body></html>')

        
    }
});
    }else{
        alert("Invalid Input!");
    }
});



router.get("/bookings/:id",middleware.isLoggedIn,function(req,res){
    Booking.find({"owner.id":req.params.id},function(err,found){
        if(err){
            res.redirect("/")
            console.log(err)
        }
        else{
            res.render("bookings",{f:found});
            console.log(req.params.id);
           
        }
    })
   
})


router.post("/bookings/:id",middleware.checkOwnership,function(req,res){
    Booking.findByIdAndRemove({_id:req.params.id},function(err){

      if(err){
          res.redirect("/");
          console.log(err)
      }
      else{
        
          res.redirect("/")
      }

    })
})
router.get("/user",middleware.isLoggedIn,function(req,res){
    res.render("find")
})


router.get("/finduser",middleware.isLoggedIn,function(req,res){
    var username=req.query.username
    console.log(username)
    if(!(/^[a-zA-Z0-9]+$/i).test(username)){
        alert('Username should contain only alphabets and numbers!');
    }else{
    query = { $where:`this.username === '${username}'` }
    User.find(query, function (err, users) {
        if (err) {
            res.redirect("/");
            console.log(err)
        } else {
            res.render('result',{users:users});
        }
    });
}

});
module.exports=router;
