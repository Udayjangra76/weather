const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    feels_like: Number,
    main: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Weather', WeatherSchema);
