const booking = require("../models/booking");

var middlewareObj={};


middlewareObj.checkOwnership=function(req,res,next){

        if(req.isAuthenticated()){
           booking.findById({_id:req.params.id},function(err,found){
              if(err){
                    res.redirect("back")
                }else{
                     if(found.owner.id.equals(req.user._id)){
                            next();
                     }else{
                          res.redirect("back");
                          }
                     }
      
          });
        }else{
                   res.redirect("back")
             }
    }

    middlewareObj.isLoggedIn=function(req,res,next){
        
            if(req.isAuthenticated()){
                return next();
            }
            res.redirect("/login");
            
        }


    module.exports=middlewareObj;