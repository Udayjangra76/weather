import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityWeatherChart from './CityWeatherChart';
import './DailySummaries.css'; // Import the CSS file

const DailySummaries = () => {
    const [summaries, setSummaries] = useState([]);

    useEffect(() => {
        const fetchSummaries = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/weather/summaries`);
                setSummaries(response.data);
            } catch (error) {
                console.error('Error fetching daily summaries:', error);
            }
        };

        fetchSummaries();
    }, []);

    console.log(summaries);
    return (
        <div>
            <h1>Daily Weather Summaries</h1>
            <div className="summaries-container">
                {summaries.map((summary, index) => (
                    <div key={index} className="summary-chart-container">
                        <ul>
                            <li>
                                <strong>City:</strong> {summary.cityname}<br />
                                <strong>Date:</strong> {new Date(summary.summary.date).toLocaleDateString()}<br />
                                <strong>Average Temperature:</strong> {summary.summary.averageTemperature?.toFixed(2)}°C<br />
                                <strong>Max Temperature:</strong> {summary.summary.maxTemperature?.toFixed(2)}°C<br />
                                <strong>Min Temperature:</strong> {summary.summary.minTemperature?.toFixed(2)}°C<br />
                                <strong>Dominant Condition:</strong> {summary.summary.dominantWeatherCondition}<br />
                            </li>
                        </ul>
                        <CityWeatherChart key={summary.cityname} cityData={summary} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailySummaries;
