import React from 'react';
import './App.css';
import axios from 'axios'; // Import axios for making HTTP requests
import DailySummaries from './components/DailySummaries';
import WeatherSummary from './components/WeatherSummary';

function App() {

  const handleAlertClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/weather/fetch');
      console.log('Fetch request response:', response.data);
      alert('Alert send succesfully successfully!');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed.');
    }
  };

  return (
    <div className="App">
      <WeatherSummary />
      <button className="alert-button" onClick={handleAlertClick}>Alert</button>
      <DailySummaries />
    </div>
  );
}

export default App;

