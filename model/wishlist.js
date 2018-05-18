var mongoose = require('mongoose');
var Schema = mongoose.Schema; //set undefined schema object
var ObjectId = mongoose.Schema.Types.ObjectId;

//define schema object
var wishList = new Schema({
    title: {type: String, default: "Wish List"},
    products: [{type: ObjectId, ref: "Product"}]
});

module.exports = mongoose.model('WishList', wishList);