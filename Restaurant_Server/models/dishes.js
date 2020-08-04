const mongoose=require('mongoose');
const schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const currency=mongoose.Types.Currency;
const commschm=new schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true

    }
}
,{
    timestamps:true
});

const dishschm=new schema({
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
category:{
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
},
comments:[ commschm ]
},{
    timestamps:true
});

var dishes=mongoose.model('dish',dishschm);

module.exports=dishes;