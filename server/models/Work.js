const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    description: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String,
        required: 'This field is required.'
    },

    phoneno: {
        type: String,
        required: 'This field is required.'
    },

    category: {
        type: String,
        enum: ['Fitness', 'Electronics', 'Clothing', 'Health & Household', 'Dance'],
        required: 'This field is required.'
    },


    image: {
        type: String,
        required: 'This field is required.'
    },
});

module.exports = mongoose.model('Work', workSchema);