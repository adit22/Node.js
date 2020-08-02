const mongoose=require('mongoose');

const dishes=require('./models/dishes');


const url='mongodb://localhost:27017/restaurant';
const connect=mongoose.connect(url);

connect.then((db)=>{
    console.log("Connected to server");

    dishes.create({
        name:"pizza",
        description:"very tasty"
    }).then((dish)=>{
        console.log(dish);
        return dishes.findByIdAndUpdate(dish._id,{
            $set:{description:'Updated description'}
        },
        {new:true}).exec();

    }) 
    .then((dishes)=>{
        console.log(dishes);
        dishes.comment.push({
            rating:4,
            comment:'good',
            author:'aditya'
        });
        return dishes.save();
    }).then(()=>{
        console.log(dishes);
        return dishes.remove({})

    }).then(()=>{
        return mongoose.connection.close();
    }).catch((err)=>{
        console.log(err);
    });
});
