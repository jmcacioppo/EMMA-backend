var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var User = require('./model');
var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var uri = process.env.URI || config.uri

mongoose.connect(uri);

// Main page with basic documentation for users. 
app.get('/', function(req, res) {
	res.json({"message" : "Hello World"})
})




var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening at localhost:3000");