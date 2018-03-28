var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var questionnaireSchema = new Schema({
    date: Date,
    mentalDemand: String,
    physicalDemand: String,
    temporalDemand: String,
    performance: String,
    effort: String,
    frustration: String
});

var healthKitSchema = new Schema({
    date: Date,
    caloriesBurned: Number,
    heartRate: Number,
    standingHours: Number,
    steps: Number
});

var userSchema   = new Schema({
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
