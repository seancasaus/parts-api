var mongoose = require('mongoose');
var Schema = mongoose.Schema; //set undefined schema object

//define schema object
var product = new Schema({
    title: String,
    price: Number,
    likes: {type: Number, default: 0}
});

module.exports = mongoose.model('Product', product);
