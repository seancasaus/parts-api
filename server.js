var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/parts-shop');

var Product = require('./model/product');
var WishList = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product', function(request, response) {
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;
    product.save(function(err, savedProduct) {
        //send back error
        if(err) {
            response.status(500).send({error: "Could not save product"});
        }
        //send back newly created product
        else {
            response.status(200).send(savedProduct);
        }
    });
});

app.get('/product', function(request, response) {
    //async if else responses
    Product.find({}, function(err, products) {
        if(err) {
            response.status(500).send({error: "Could not find products"});
        }
        else {
            response.status(200).send(products);
        }
    });
});

app.listen(3000, function() {
    console.log("Swag shop api running on port 3000");
});