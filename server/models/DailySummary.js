const mongoose = require('mongoose');

const dailySummarySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    averageTemperature: { type: Number, required: true },
    maxTemperature: { type: Number, required: true },
    minTemperature: { type: Number, required: true },
    dominantWeatherCondition: { type: String, required: true },
});

const DailySummary = mongoose.model('DailySummary', dailySummarySchema);

module.exports = DailySummary;
