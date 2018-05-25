var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/parts-shop');

var Product = require('./model/product');
var WishList = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//post request for product portion of the server 
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

//get request for product protion of the server
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

//post request for wishlist portion of the server
app.post('/wishlist', function(request, response) {
    var wishList = new WishList();
    wishList.title = request.body.title;

    wishList.save(function(err, products) {
        if(err) {
            response.status(500).send({error: "Could not create wishlist"});
        }
        else {
            response.status(200).send(products);
        }
    });
});

//get request for wishlist portion of the server
app.get('/wishlist', function(request, response) {
    WishList.find({}, function(err, wishLists) {
        response.status(200).send(wishLists);
    });
});

//put request for wishlist protion of the server, adds items to a wishlist
app.put('/wishlist/product/add', function(request, response) {
    Product.findOne({_id: request.body.productId}, function(err, product) {
        if (err) {
            response.status(500).send({error: "Could not add item to wishlist"});
        }
        else {
            WishList.update({_id:request.body.wishListId}, {$addToSet: {products: product._id}}, function(err, wishList) {
                if(err) {
                    response.status(500).send({error: "Could not add item to wishlist"});
                }
                else {
                    response.status(200).send(wishList);
                }
            });
        }
    });
});

app.listen(3000, function() {
    console.log("Shop api running on port 3000");
});