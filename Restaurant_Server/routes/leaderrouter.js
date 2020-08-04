const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const leader=require('../models/leaders');

const leadrouter=express.Router();
leadrouter.use(bodyparser.json());
leadrouter.route('/').get((req,res,next)=>{
    leader.find({}).then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>
        next(err)).catch((err)=>next(err));
 }).post((req,res,next)=>{
    leader.create(req.body)
    .then((leader)=>{
        console.log("leader created ",leader);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(leader);
    },(err)=>next(err)).catch((err)=>next(err));
 }).put((req,res,next)=>{
     res.statusCode=403;
     res.end('put operation not supported on leader');
 }).delete((req,res,next)=>{
    leader.remove({}).then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(leader);  
    },(err)=>next(err)).catch((err)=>next(err));
 });
 
 leadrouter.route('/:leaderId')
 .get((req,res,next) => {
     leader.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(leader);
    },(err)=>next(err)).catch((err)=>next(err));
  })
  .put((req,res,next) => {
            
    eader.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true})
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }); 
    leader.save()
    .then((leader)=>{

        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);

    },(err)=>next(err));
    }
  )
  .post((req,res,next) => {
     res.statusCode=403;
     res.end('Put operation is not supported on /leaders/'+req.params.leaderId);
  })
  .delete((req,res,next) => {
    leader.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err)); 
  });

 module.exports=leadrouter;