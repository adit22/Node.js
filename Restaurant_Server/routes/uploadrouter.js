const express=require('express');
const bodyparser=require('body-parser');
const multer=require('multer');
const authenticate=require('../authenticate');
const cors=require('./cors');
const storage=multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,'public/images');
            
        },

        filename:(req,file,cb)=>{

            cb(null,file.originalname)

        }
    }
);


const imageFileFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg||jpeg||png||gif)$/)){
        return cb(new Error('You can upload only image file'),false);
    }
    cb(null,true);

};

const upload=multer({storage:storage,fileFilte:imageFileFilter});

const uploadouter=express.Router();
uploadouter.use(bodyparser.json());


uploadouter.route('/')
.options(cors.corewithOptions,(req,res)=>{
    res.sendStatus(200);
})
.get(cors.cors,authenticate.verifyUser,authenticate.verifyadmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('put operation not supported on dishes');

})
.post(cors.corewithOptions,authenticate.verifyUser,authenticate.verifyadmin,upload.single('imageFile'),(req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.join(req.file);
})
.put(cors.corewithOptions,authenticate.verifyUser,authenticate.verifyadmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('put operation not supported on dishes');

})
.delete(cors.corewithOptions,authenticate.verifyUser,authenticate.verifyadmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('put operation not supported on dishes');

});
module.exports=uploadouter;