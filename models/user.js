var mongoose=require('mongoose'),
passportLocalMongoose  =require("passport-local-mongoose");
var UserSchema=new mongoose.Schema({
    name:String,
    sname:String,
    email_id:String,
    username:String,
    password:String

});
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);