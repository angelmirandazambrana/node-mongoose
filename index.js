const mongoose = require('mongoose');
mongoose.Promise=require('bluebird');

const Dishes=require('./models/dishes');

const url='mongodb://localhost:27017/conFusion';
const connect=mongoose.connect(url);
const connection=mongoose.connection;

connect.then(()=>{

    console.log('Connected correctly to server');
   
    var newDish=Dishes({
        name: 'Uthapizza5',
        description: 'test'
    });

    newDish.save()
        .then((dish)=>{
            console.log(dish);

            return Dishes.find({}).exec();
        })
        .then ((dishes)=>{
            console.log(dishes);
            return Dishes.remove({});
        })
        .then(()=>{
            return connection.close();
        })
        .catch((err)=>{
            console.log(err);
        });
})