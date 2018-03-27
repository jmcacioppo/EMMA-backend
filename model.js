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

var userSchema   = new Schema({
    dateOfBirth: Date,
    email: String,
    gender: String,
    height: Number,
    name: String,
    password: String,
    tasksQuestionnaire: [questionnaireSchema],
    weight: Number
});
 
module.exports = mongoose.model('User', userSchema);
