const express=require('express');
const bodyparser=require('body-parser');

const leadrouter=express.Router();
leadrouter.use(bodyparser.json());
leadrouter.route('/').all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 }).get((req,res,next)=>{
     res.end('will send all the leaders to you');
 }).post((req,res,next)=>{
     res.end('will add the leader: '+req.body.name+'with details: '+req.body.description);
 }).put((req,res,next)=>{
     res.statusCode=403;
     res.end('put operation not supported on leader');
 }).delete((req,res,next)=>{
     res.end('deleting all the leaders');
 });
 
 leadrouter.route('/:leaderId')
 .all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
 .get((req,res,next) => {
     res.end('Will send details of the leader '+ req.params.leaderId +' to you!');
  })
  .put((req,res,next) => {
     res.write('Updating the leader: '+req.params.leaderId+'\n');
     res.end('Will update the leader: '+ req.body.name +' with details: '+ req.body.description);
  })
  .post((req,res,next) => {
     res.statusCode=403;
     res.end('Put operation is not supported on /leaders/'+req.params.leaderId);
  })
  .delete((req,res,next) => {
     res.end('Deleting the leader: '+req.params.leaderId);
  });

 module.exports=leadrouter;