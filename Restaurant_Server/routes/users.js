var express = require('express');
const bodyparser=require('body-parser');
var user=require('../models/user');
var passport=require('passport');
var authenticate=require('../authenticate');
const cors=require('./cors');
var router = express.Router();
router.use(bodyparser.json());



/* GET users listing. */

router.options('*',cors.corswithOptions,(req,res)=>{
  res.sendStatus( 200);

});
router.get('/',cors.cors, authenticate.verifyUser,authenticate.verifyadmin,function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup',cors.corswithOptions,(req,res,next)=>{
  user.register(new user({username:req.body.username}),
  req.body.password,(err,user)=>
  {
    if(err){
      res.statusCode=500;
      res.setHeader('Content-type','application/json');
      res.json({err:err});
    }
    else{
      if(req.body.firstname)
        user.firstname=req.body.firstname;
      if(req.body.lastname)
        user.lastname=req.body.lastname;
    user.save((err,user)=>{
      if(err){
        res.statusCode=500;
        res.setHeader('Content-type','application/json');
        res.json({err:err});
        return ;
      }
      passport.authenticate('local')(req,res,()=>{
      res.statusCode=200;
      res.setHeader('Content-type','application/json');
      res.json({success:true, status:'Successfull Registration'});
      });
    });
    }
  });
});


router.post('/login', cors.corswithOptions,(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
    if(err)
      return next(err);
    
    if(!user)
      {
        res.statusCode=401;
        res.setHeader('Content-type','application/json');
        res.json({success:false,  status:'Unsuccessfull LogIn',err:info});
      }

      req.logIn(user,(err)=>{
        if(err){
          res.statusCode=401;
        res.setHeader('Content-type','application/json');
        res.json({success:false,  status:'Unsuccessfull LogIn',err:'Could not login User'});
        }
      

      var token=authenticate.getToken({_id:req.user._id});
      res.statusCode=200;
      res.setHeader('Content-type','application/json');
      res.json({success:true,  status:'Successfull LogIn',token:'Could not login User'});
    });
})(req,res,next);  
 
    // res.statusCode=200;
    // res.setHeader('Content-type','application/json');
    // res.json({success:true, token:token, status:'Successfull LogIn'});

//   if(!req.session.user){



//     var authHeader=req.headers.authorization;
    
//     if(!authHeader){
//       var err=new Error('You are not authenticated');
//       res.setHeader('WWW-Authenitcate','Basic');
//       err.status=401;
//       return next(err);
//     }
//     var auth=new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
//     var username=auth[0];
//     var password=auth[1];
//     user.findOne({username:username})
//     .then((user)=>{
//       if(user===null){
//         var err=new Error('user '+username+' does not exist');
//         err.status=403; 
//         return next(err);
      
//       }
//       else if(user.password!==password){
        
//         var err=new Error('Your password is incorrect');
//         err.status=403; 
//         return next(err);
//       }

//       else if(user.username===username && user.password===password){
//         req.session.user='authenticated';
//         res.statusCode=200;
//         res.setHeader('Content-Type','text/json');
//         res.end('you are authenticated');
      
//       }
    
//     })
//     .catch((err)=>next(err));
   
//     }

//     else{
// res.statusCode=200;
// res.setHeader('Content-Type','text/plain');
// res.end('You are already authenticated');

//     }
});


router.get('/logout',cors.corswithOptions,(req,res,next)=>{
if(req.session){
  req.session.destroy();
  res.clearCookie('session-id');
  res.redirect('/');
}
else{
  var err=new Error('You are not logged in ');
  res.statusCode=403;
  next(err);
}
});


router.get('/facebook/token',
passport.authenticate('facebook-toke'),
(req,res)=>{
  if(req.user){
    var token=authenticate.getToken({_id:req.user._id});
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    res.json({success:true, token:token, status:'Successfull LogIn'});

  }
})

router.get('/checkJWTToken',cors.corswithOptions,(req,res)=>{
  passport.authenticate('jwt',{session:false},(err,user,info)=>{
  if(err){
    return next(err);
  }
  if(!user){
    res.statusCode=401;
    res.setHeader('Content-Type','application/json');
    return res.json({status:'JWT invalid',success:false,err:info});
  }
  else{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    return res.json({status:'JWT valid',success:true,user:user});
    
  }
})(req,res);
});
module.exports = router;
