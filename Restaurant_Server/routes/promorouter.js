const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const promos=require('../models/promotions');
const { findByIdAndUpdate } = require('../models/promotions');
const authenticate=require('../authenticate');
const cors=require('./cors');
const promorouter=express.Router();
promorouter.use(bodyparser.json());
promorouter.route('/')
.options(cors.corewithOptions,(req,res)=>{
    res.sendStatus(200);
})
.get(cors.cors,(req,res,next)=>{
    promos.find(req.query).then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err)=>
        next(err)).catch((err)=>next(err));
 })
 .post(cors.corswithOptions,authenticate.verifyUser,(req,res,next)=>{
    promos.create(req.body)
    .then((promo)=>{
        console.log("Promo created ",promo);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(promos);
    },(err)=>next(err)).catch((err)=>next(err));
 })
 .put(cors.corswithOptions,authenticate.verifyUser,(req,res,next)=>{
     res.statusCode=403;
     res.end('put operation not supported on promotions');
 })
 .delete(cors.corswithOptions,authenticate.verifyUser,(req,res,next)=>{
    promos.remove({}).then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(promos);  
    },(err)=>next(err)).catch((err)=>next(err));
 });
 
 promorouter.route('/:promoId')
 .options(cors.corewithOptions,(req,res)=>{
    res.sendStatus(200);
})
 .get(cors.cors,(req,res,next) => {
    promos.findById(req.params.promoId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(promos);
    },(err)=>next(err)).catch((err)=>next(err));
 })
 .put(cors.corswithOptions,authenticate.verifyUser,(req,res,next) => {

    promos/findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{new:true})
    .then((promos)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application.js');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
 })
 .post(cors.corswithOptions,authenticate.verifyUser,(req,res,next) => {
    res.statusCode=403;
    res.end('Post operation is not supported on /promotions/'+req.params.promoId);
 })
 .delete(cors.corswithOptions,authenticate.verifyUser,(req,res,next) => {
    promos.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err)); 
 });


 module.exports=promorouter;