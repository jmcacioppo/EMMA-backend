var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var questionnaireSchema = new Schema({
    date: Date,
    eyes: Number,
    restOfBody: Number,
    gameResults: Number,
    mentalDemand: String,
    physicalDemand: String,
    temporalDemand: String,
    performance: String,
    effort: String,
    frustration: String
});

var addDataSchema = new Schema({
    date: Date,
    emotions: String,
    mental: Number,
    physical: Number,
    water: Number
});

var healthKitSchema = new Schema({
    date: Date,
    caloriesBurned: Number,
    heartRate: Number,
    standingHours: Number,
    steps: Number
});

var userSchema   = new Schema({
    addData: [addDataSchema],
    birthday: Date,
    email: String,
    gender: String,
    healthKitData: [healthKitSchema],
    height: Number,
    name: String,
    password: String,
    tasksQuestionnaire: [questionnaireSchema],
    weight: Number
});
 
module.exports = mongoose.model('User', userSchema);
