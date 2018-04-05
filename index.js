var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var User = require('./model');
var config = require('./config');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

var app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var uri = process.env.URI || config.uri
mongoose.connect(uri);

// Main page with basic documentation for users. 
app.get('/', function(req, res) {
	res.json({"message" : "Hello World"});
});

// GET all users
app.get('/users', function(req, res) {
	User.find(function(err, users) {
            if (err) res.send(err);
            res.json(users);
        });
});

// POST to create a new user
app.post('/users/newUser', function(req,res) {
	var user = new User();

    // Set text and user values from request
    user.birthday = req.body.birthday;
    user.email = req.body.email;
    user.gender = req.body.gender;
    user.height = req.body.height;
    user.name = req.body.name;
    user.password = req.body.password;
    user.weight = req.body.weight;

    // Save user and check for errors
    user.save(function(err) {
        if (err) res.send(err);
        else res.json({'user' : user});
    });
});

// POST to find a user
app.post('/users/findUser', function(req,res) {
    User.find({'email' : req.body.email, 'password' : req.body.password}, function(err, user) {
        if(err) res.send(err);

        if(user) res.json(user);
        else res.json({ message : 'No user found'});
    });
});

// GET specific user by id
app.get('/users/:user_id', function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
        if(err) res.send(err);

        if(user) res.json(user);
        else res.json({ message : 'No user found'});
    });
});

// PUT to update a user's profile
app.put('/users/profile/:user_id', function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
        if(err) res.send(err);
        
        // Update the user text
        user.birthday = req.body.birthday;
        user.email = req.body.email;
        user.gender = user.gender;
        user.height = req.body.height;
        user.name = req.body.name;
        user.password = req.body.password;
        user.weight = req.body.weight;
        
        user.save(function(err) {
            if (err) res.send(err);
            res.json(user);
        });

    });
});

app.get('/users/health/:user_id', function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
        if(err) res.send(err);
        
        let healthKitData = {
            'healthKitData' : user.healthKitData
        }
        // Get health kit data
        res.json(healthKitData);
    });
});

// PUT to update a user's health information
app.put('/users/health/:user_id', function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
        if(err) res.send(err);
        
        // Update the user text
        user.healthKitData.push(req.body.healthKitData);
        //user.tasksQuestionnaire.push(req.body.tasksQuestionnaire);
        
        user.save(function(err) {
            if (err) res.send(err);
            res.json(user);
        });
    });
});

// DELETE a user
app.delete('/users/:user_id', function(req, res) {
	User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted user!' });
    });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening at localhost:3000...");