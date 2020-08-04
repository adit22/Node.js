const mongoose=require('mongoose');
const schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const currency=mongoose.Types.Currency;

const promoschm=new schema({
name:{
    type:String,
    required:true,
    unique:true
},
description:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},

label:{
    type:String,
    default:''
},
price:{
    type:currency,
    required:true,
    min:0
},
featured:{
    type:Boolean,
    default:false
}});

var promos=mongoose.model('promo',promoschm);

module.exports=promos;