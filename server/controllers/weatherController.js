
const axios = require('axios');
const Weather = require('../models/Weather');
const nodemailer = require('nodemailer');

const saveWeatherData = async (city, temperature, feels_like, main) => {
    const weather = new Weather({
        city,
        temperature,
        feels_like,
        main,
    });
    await weather.save();
};

const sendAlert = async (email, weatherData) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const message = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Weather Alert',
        text: `Alert: ${weatherData.city} is experiencing ${weatherData.main} with a temperature of ${weatherData.temperature}°C.`,
    };
    await transporter.sendMail(message);
};

const checkThresholds = async (weatherData) => {
    const threshold = 35;
    if (weatherData.temperature > threshold)
        await sendAlert(process.env.USER_EMAIL, weatherData);
};

const getWeatherData = async (req, res) => {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    const apiKey = process.env.WEATHER_API_KEY;

    try {
        for (const city of cities) {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            const { temp, feels_like } = response.data.main;
            const main = response.data.weather[0].main;

            // Save data to MongoDB
            await saveWeatherData(city, temp - 273.15, feels_like - 273.15, main);
            checkThresholds({ city, temperature: temp - 273.15, main });
        }

        res.status(200).json({ message: 'Weather data fetched and stored successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving weather data', error });
    }
};



const getStoredWeatherData = async (req, res) => {
    try {
        const weatherData = await Weather.find().sort({ timestamp: -1 }); // Sort by newest first
        res.status(200).json([weatherData[0], weatherData[1], weatherData[2], weatherData[3], weatherData[4], weatherData[5]]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stored weather data', error });
    }
};
module.exports = { getWeatherData, getStoredWeatherData };