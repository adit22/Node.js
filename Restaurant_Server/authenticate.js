var passport=require('passport');
var localstrategy=require('passport-local').Strategy;

var user=require('./models/user');
var jwtStrategy=require('passport-jswt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt();
var jwt=require('jsonwebtoken');
var config=require('./config');

exports.local=passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
 
exports.getToken=function(user){
    return jwt.sign(user,config.secretKey, 
        {expiresIn:3600});

};

var opts={};

opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.secretKey;

exports.jwtPassport=passport.use(new jwtStrategy(opts,
    (jwt_payload,done)=>{
        console.log("JWT payload: ",jwt_payload);
        user.findOne({_id:jwt_payload._id},(err,user)=>{
            if(err){
                return done(err,false);
            }
            else if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        });
    }));

    exports.verifyUser=passport.authenticate('jwt',{session:false});



    exports.verifyadmin = (req,res,next) => {
        if (req.user.admin===true){
            console.log('user is '+req.user.admin)
          next();
        }
        else{
            var err = new Error('YOU CANNOT PERFORM THIS OPERATIONS');
              err.status=404;
              return next(err);
        }
        
        }     