var mongoose=require('mongoose');
var schema=mongoose.Schema;
var passportlocalmongoose=require('passport-local-mongoose');

var user=new schema({
    firstname:{
        type:String,
        default:'',
    },
    lastname:{
        type:String,
        default:'',
    },
    facebookId:String,
admin:{
    type:Boolean,
    default:false
}
});

user.plugin(passportlocalmongoose);

module.exports=mongoose.model('user',user);

