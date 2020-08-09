const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const dishes=require('../models/dishes');
const authenticate=require('../authenticate');

const cors=require('./cors');

const dishrouter=express.Router();
dishrouter.use(bodyparser.json());


dishrouter.route('/')
.options(cors.corewithOptions,(req,res)=>{
    res.sendStatus(200);
})
.get(cors.cors,(req,res,next)=>{
     dishes.find(req.query )
     .populate('comments.author')
     .then((dish)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(dishes);
     },(err)=>
         next(err)).catch((err)=>next(err));
 })
 .post(cors.corswithOptions,(authenticate.verifyUser,authenticate.verifyadmin,(req,res,next)=>{
    dishes.create(req.body)
    .then((dish)=>{
        console.log("dish created ",dish);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(dishes);
    },(err)=>next(err)).catch((err)=>next(err));
 })
 .put(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyadmin,(req,res,next)=>{
     res.statusCode=403;
     res.end('put operation not supported on dishes');
 })
 .delete(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyadmin,
    (req,res,next)=>{
    dishes.remove({}).then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(dishes);  
    },(err)=>next(err)).catch((err)=>next(err));

 }));
 
 dishrouter.route('/:dishId')
 .options(cors.corswithOptions,(req,res)=>{
    res.sendStatus(200);
})
 .get(cors.cors,(req,res,next) =>{
    dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(dishes);
    },(err)=>next(err)).catch((err)=>next(err));
 })
 .post(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyadmin,(req,res,next) => {
     res.statusCode=403;
     res.end('Post operation not supported on /dishes/'+ req.params.dishId);
 })
 .put(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyadmin,(req,res,next) => {
     dishes.findByIdAndUpdate(req.params.dishId,{
         $set:req.body
     },{new:true})
     .then((dish)=>{
        console.log("dish created ",dish);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
         res.json(dishes);
    },(err)=>next(err)).catch((err)=>next(err));
 })
 .delete(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyadmin,(req,res,next) =>{
     dishes.findByIdAndRemove(req.params.dishId)
     .then((resp)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(resp);
     },(err)=>next(err))
     .catch((err)=>next(err)); 
 });







 dishrouter.route('/:dishId/comments')
 .options(cors.corswithOptions,(req,res)=>{
    res.sendStatus(200);
})
 .get(cors.cors,(req,res,next)=>{
    dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish)=>{
        if(dish!=null){
            
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish.comments);
        }
        else{
            err=new Error('Dish '+req.params.dishId+' not found');
            err.status=404;
            return next(err);

        }
    },(err)=>
        next(err)).catch((err)=>next(err));
})
.post(cors.corswithOptions,authenticate.verifyUser,(req,res,next)=>{
   dishes.findById(req.params.dishId)
   .then((dish)=>{
       console.log("dish created ",dish);
       if(dish!=null){
        req.body.author=req.user._id;
        // res.statusCode=200;
        // res.setHeader('Content-Type','application/json');
        dish.comments.push(req.body);
        dish.save()
        .then((dish)=>{
            dishes.findById(dish._id)
            .populate('comments.author')
            .then((dish)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
        });

        },(err)=>next(err));
        }
        else{
            err=new Error('Dish '+req.params.dishId+' not found');
            err.status=404;
            return next(err);

        }
   },(err)=>next(err)).catch((err)=>next(err));
})
.put(cors.corswithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('put operation not supported on dishes '+req.params.dishId+' comments');
})
.delete(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyadmin,(req,res,next)=>{
   dishes.findById(req.params.dishId).then((resp)=>{
    if(dish!=null){
           for (var i=(dish.comments.length-1);i>=0;i--){
               dish.comments.id(dish.comments[i]._id).remove();
           }  
           dish.save()
           .then((dish)=>{
   
               res.statusCode=200;
               res.setHeader('Content-Type','application/json');
               res.json(dish);
   
           },(err)=>next(err));
        
        }
        else{
            err=new Error('Dish '+req.params.dishId+' not found');
            err.status=404;
            return next(err);

        } 
   },(err)=>next(err)).catch((err)=>next(err));
});

dishrouter.route('/:dishId/comments/:commentId')
.options(cors.corswithOptions,(req,res)=>{
    res.sendStatus(200);
})
.get(cors.cors ,(req,res,next) =>{
   dishes.findById(req.params.dishId)
   .populate('comments.author')
   .then((dish)=>{
    if(dish!=null && dish.comments.id(req.params.commentId)!=null){
            
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish.comments);
        }
    else if(dish==null){
            err=new Error('Dish '+req.params.dishId+' not found');
            err.status=404;
            return next(err);

    }
    else{
        err=new Error('Comment '+req.params.commentId+' not found');
            err.status=404;
            return next(err);

    }
   },(err)=>next(err)).catch((err)=>next(err));
})
.post(cors.corswithOptions,authenticate.verifyUser,(req,res,next) => {
    res.statusCode=403;
    res.end('Post operation not supported on /dishes/'+ req.params.dishId+' /comment/'+req.params.commentId);
})
.put(cors.corswithOptions,authenticate.verifyUser,(req,res,next) => {
    dishes.findById(req.params.dishId)
   .then((dish)=>{
       
    if(dish!=null && dish.comments.id(req.params.commentId)!=null){
            
        if(req.body.rating){
            dish.comments.id(req.params.commentId).rating=req.body.rating;
        }
        if(req.body.comment){
            dish.comments.id(req.params.commentId).comment=req.body.comment;
        }
        dish.save()
        .then((dish)=>{
            dishe.findById(dish._id)
       .populate('comments.author')
       .then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
       })
            

        },(err)=>next(err));
        }
    else if(dish==null){
            err=new Error('Dish '+req.params.dishId+' not found');
            err.status=404;
            return next(err);

    }
    else{
        err=new Error('Comment '+req.params.commentId+' not found');
            err.status=404;
            return next(err);

    }
   },(err)=>next(err)).catch((err)=>next(err));
})
.delete(cors.corswithOptions,authenticate.verifyUser,(req,res,next) =>{
    dishes.findById(req.params.dishId).then((resp)=>{
        if(dish!=null && dish.comments.id(req.params.commentId)!=null){
               for (var i=(dish.comments.length-1);i>=0;i--){
                   dish.comments.id(dish.comments[i]._id).remove();
               }  
               dish.save()
               .then((dish)=>{
                 dishes.findById(dish._id)
                 .populate('comments.author')
                 .then((dish)=>{
                    
                   res.statusCode=200;
                   res.setHeader('Content-Type','application/json');
                   res.json(dish);
       
                 })
               },(err)=>next(err));
            
            } else if(dish==null){
                err=new Error('Dish '+req.params.dishId+' not found');
                err.status=404;
                return next(err);
    
        }
        else{
            err=new Error('Comment '+req.params.commentId+' not found');
                err.status=404;
                return next(err);
    
        }
       },(err)=>next(err))
    .catch((err)=>next(err)); 
});
 module.exports=dishrouter;