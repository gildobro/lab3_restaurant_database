const mongoose = require('mongoose');
//const Restaurant = require('../../w4_3133_nodejs_express_mongodb_template/models/Employee');

const RestuarantSchema = new mongoose.Schema({
    address:[
            {
                building: {
                    type: String
                },
                street: {
                    type: String
                },
                zipcode: {
                    type: String
                },
            },
    ],
    city: {
        type: String,
    },
    cuisine: {
        type: String,
    },
    name: {
        type: String,
    },
    restaurant_id: {
        type: String,
    },
})


RestuarantSchema.post('init', (doc) => {
    console.log('%s has been initialized to the db', doc._id);
});

RestuarantSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
});

RestuarantSchema.post('save', (doc) => {
    console.log('%s has been saved', doc._id);
})

RestuarantSchema.post('remove', (doc) => {
    console.log('%s has been removed', doc._id);
});

const Restaurant = mongoose.model("Restaurant", RestuarantSchema);
module.exports = Restaurant;