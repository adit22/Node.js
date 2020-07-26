const express=require('express');
const bodyparser=require('body-parser');

const dishrouter=express.Router();
dishrouter.use(bodyparser.json());
dishrouter.route('/').all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 }).get((req,res,next)=>{
     res.end('will send all the dishes to you');
 }).post((req,res,next)=>{
     res.end('will add the dish: '+req.body.name+'with details: '+req.body.description);
 }).put((req,res,next)=>{
     res.statusCode=403;
     res.end('put operation not supported on dishes');
 }).delete((req,res,next)=>{
     res.end('deleting all the dishes');
 });
 
 

 module.exports=dishrouter;