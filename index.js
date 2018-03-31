const mongoose = require('mongoose');
mongoose.Promise=require('bluebird');

const Dishes=require('./models/dishes');

const url='mongodb://localhost:27017/conFusion';
const connect=mongoose.connect(url);
const connection=mongoose.connection;

connect.then(()=>{

    console.log('Connected correctly to server');
   
    Dishes.create({
        name: 'Uthapizza',
        description: 'test'
    })
    .then((dish)=>{
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {description: 'Updated test'},
        },{
            new:true
        })  
        .exec();
    })
    .then ((dish)=>{
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: "This is a comment test",
            author: 'AMZ'
        });
        return dish.save();
    })
    .then ((dish) =>{
        console.log(dish);   
        return Dishes.remove({});
    })
    .then(()=>{
        return connection.close();
    })
    .catch((err)=>{
        console.log(err);
    });
})