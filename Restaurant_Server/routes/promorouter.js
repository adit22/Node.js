const express=require('express');
const bodyparser=require('body-parser');

const promorouter=express.Router();
promorouter.use(bodyparser.json());
promorouter.route('/').all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 }).get((req,res,next)=>{
     res.end('will send all the promos to you');
 }).post((req,res,next)=>{
     res.end('will add the promo: '+req.body.name+'with details: '+req.body.description);
 }).put((req,res,next)=>{
     res.statusCode=403;
     res.end('put operation not supported on promotions');
 }).delete((req,res,next)=>{
     res.end('deleting all the promotions');
 });
 
 promorouter.route('/:promoId')
.all((req,res,next) => {
   res.statusCode=200;
   res.setHeader('Content-Type','text/plain');
   next();
})
.get((req,res,next) => {
    res.end('Will send details of the promotion '+ req.params.promoId +' to you!');
 })
 .put((req,res,next) => {
    res.write('Updating the promotion: '+req.params.promoId+'\n');
    res.end('Will update the promotion: '+ req.body.name +' with details: '+ req.body.description);
 })
 .post((req,res,next) => {
    res.statusCode=403;
    res.end('Post operation is not supported on /promotions/'+req.params.promoId);
 })
 .delete((req,res,next) => {
    res.end('Deleting the promotion: '+req.params.promoId);
 });


 module.exports=promorouter;