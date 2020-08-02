const mongoose=require('mongoose');
const schema=mongoose.Schema;
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
comments:[ commschm ]
},{
    timestamps:true
});

var dishes=mongoose.model('dish',dishschm);

module.exports=dishes;