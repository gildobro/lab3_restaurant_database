const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();


//4.GET ALL RESTAURANTS
//http://localhost:8081/restaurants
app.get('/restaurants', async (req, res) => {
    const sortBy = req.query.sortBy;

    //6. SORT BY ASC
    if(sortBy === 'ASC'){
        restaurants = await restaurantModel.find({}).sort({ restaurant_id: 1}).select("_id cuisine name city restaurant_id")
    //6. SORT BY DESC
    }else if(sortBy === 'DESC'){
        restaurants = await restaurantModel.find({}).sort({ restaurant_id: -1}).select("_id cuisine name city restaurant_id")
    }else{
        restaurants = await restaurantModel.find({});
    }

    try {
        console.log(restaurants[0]);
        res.status(200).send(restaurants);
    } catch (err){
        res.status(500).send(err);
    }
})

//5. GET RESTAURANT BY CUISINE
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine;
    const restaurants = await restaurantModel.find({cuisine : cuisine});


    try {
        if(restaurants.length != 0){
            res.send(restaurants);
        }else{
            res.send(JSON.stringify({status:false, message: "No data found"}))
        }
    } catch (err) {
        res.status(500).send(err);
    }
})


//7. GET RESTAURANT BY NAME==Delicatessen
app.get('/restaurants/Delicatessen', async (req, res) => {
    const restaurants = await restaurantModel.
                                find({ $project: { _id: 0, address: 0, city: 1, cuisine: 1, name: 1, restaurant_id: 0}})
                                .where('cuisine').equals('Delicatessen')
                                .where('city').ne('Brooklyn')
                                .sort('name')
                                .select('-_id -address -restaurant_id')


    try {
        if(restaurants.length != 0){
            res.send(restaurants);
        }else{
            res.send(JSON.stringify({status:false, message: "No data found"}))
        }
    } catch (err) {
        res.status(500).send(err);
    }
})



module.exports = app;