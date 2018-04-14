var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var emotionsSchema = new Schema({
    time: Number,
    totalEmotionalEnergy: Number,
    cheerful: Number,
    annoyed: Number,
    anxious: Number,
    calm: Number
});

var physicalSchema = new Schema({
    time: Number,
    totalPhysicalEnergy: Number,
    eyesDry: Number,
    eyesTired: Number,
    head: Number,
    neck: Number,
    chest: Number,
    legs: Number,
    feet: Number
});

var mentalSchema = new Schema({
    time: Number,
    totalMentalEnergy: Number,
    gameResults: Number,
    meeting: Number,
    social: Number,
    work: Number,
    housework: Number,
    exercise: Number,
    entertainment: Number
});

var addDataFieldsSchema = new Schema({
    time: Number,
    social: Number,
    food: Number,
    nap: Number,
    water: Number,
    exercise: Number
});

var questionnaireSchema = new Schema({
    date: String,
    emotionalEnergy: [emotionsSchema],
    physicalEnergy: [physicalSchema],
    mentalEnergy: [mentalSchema]
});

var addDataSchema = new Schema({
    date: Date,
    addDataFields: [addDataFieldsSchema]
});

var healthKitSchema = new Schema({
    date: String,
    caloriesBurned: String,
    heartRate: String,
    runWalkMiles: String,
    steps: String
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
