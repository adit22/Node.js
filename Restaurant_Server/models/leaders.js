const mongoose=require('mongoose');
const schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const currency=mongoose.Types.Currency;

const leaderschm=new schema({
name:{
    type:String,
    required:true,
    unique:true
},
image:{
    type:String,
    required:true
},
designation:{
    type:String,
    required:true
},
abbr:{
    type:String,
    required:true
},

featured:{
    type:Boolean,
    default:false
},
description:{
    type:String,
    required:true
}});

var leader=mongoose.model('leader',leaderschm);

module.exports=leader;