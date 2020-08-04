const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const promos=require('../models/promotions');
const { findByIdAndUpdate } = require('../models/promotions');

const promorouter=express.Router();
promorouter.use(bodyparser.json());
promorouter.route('/').get((req,res,next)=>{
    promos.find({}).then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err)=>
        next(err)).catch((err)=>next(err));
 }).post((req,res,next)=>{
    promos.create(req.body)
    .then((promo)=>{
        console.log("Promo created ",promo);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(promos);
    },(err)=>next(err)).catch((err)=>next(err));
 }).put((req,res,next)=>{
     res.statusCode=403;
     res.end('put operation not supported on promotions');
 }).delete((req,res,next)=>{
    promos.remove({}).then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(promos);  
    },(err)=>next(err)).catch((err)=>next(err));
 });
 
 promorouter.route('/:promoId')
.get((req,res,next) => {
    promos.findById(req.params.promoId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(promos);
    },(err)=>next(err)).catch((err)=>next(err));
 })
 .put((req,res,next) => {

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
 .post((req,res,next) => {
    res.statusCode=403;
    res.end('Post operation is not supported on /promotions/'+req.params.promoId);
 })
 .delete((req,res,next) => {
    promos.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err)); 
 });


 module.exports=promorouter;