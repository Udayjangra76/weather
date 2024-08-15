import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherSummary = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/weather/stored');
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);
    console.log('sddsf');
    console.log(weatherData);

    return (
        <div>
            <h1>Weather Summary</h1>
            <ul>
                {
                    weatherData.map((data, index) => (
                        <li key={index}>
                            <strong>City:</strong> {data.city}, <strong>Temperature:</strong> {data.temperature?.toFixed(2)}°C, <strong>Feels Like:</strong> {data.feels_like?.toFixed(2)}°C, <strong>Main:</strong> {data.main}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default WeatherSummary;
