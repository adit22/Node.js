const express=require('express');
const cors=require('cors');
const { fromCallback } = require('bluebird');

const app=express();

const whiteList=[
    'https://localhost:3000','https://localhost:3443','https://localhost:4200'
]
var corsOptionsDelegate=(req,callback)=>{
    var corsOptions;
    if(whiteList.indexOf(req.header('Origin')) !== -1){
        corsOptions={origin:true};
    }
    
    else{
        corsOptions={origin:false};
    }
    callback(null,corsOptions);

};

exports.core=cors();
exports.corswithOptions=cors(corsOptionsDelegate);
