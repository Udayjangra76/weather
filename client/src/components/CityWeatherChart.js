import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CityWeatherChart = ({ cityData }) => {
    // console.log('hello');
    // console.log(cityData);
    const { summary, cityname } = cityData;

    const data = {
        labels: ['Average Temp', 'Max Temp', 'Min Temp'],
        datasets: [
            {
                label: cityname,
                data: [summary.averageTemperature, summary.maxTemperature, summary.minTemperature],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default CityWeatherChart;
