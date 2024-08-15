const Weather = require('../models/Weather');
const DailySummary = require('../models/DailySummary');

const calculateDailySummary = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(endOfDay.getDate() + 1);

        // Fetch all weather data for the current day
        const weatherData = await Weather.find({
            timestamp: { $gte: startOfDay, $lt: endOfDay }
        });

        if (weatherData.length === 0) {
            return res.status(200).json({ message: 'No weather data for today' });
        }

        // Group weather data by city
        const cityGroups = weatherData.reduce((acc, data) => {
            const city = data.city;  // Assuming `city` is a field in the weather data
            if (!acc[city]) {
                acc[city] = [];
            }
            acc[city].push(data);
            return acc;
        }, {});

        const summaries = [];

        for (const city in cityGroups) {
            const cityname = city;
            const cityData = cityGroups[city];

            const temperatures = cityData.map(data => data.temperature);
            const conditions = cityData.map(data => data.main); // Assuming `main` is the weather condition

            // Calculate the metrics
            const averageTemperature = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
            const maxTemperature = Math.max(...temperatures);
            const minTemperature = Math.min(...temperatures);

            // Calculate dominant weather condition
            const conditionCounts = conditions.reduce((count, condition) => {
                count[condition] = (count[condition] || 0) + 1;
                return count;
            }, {});

            const dominantWeatherCondition = Object.keys(conditionCounts).reduce((a, b) => conditionCounts[a] > conditionCounts[b] ? a : b);

            // Create and store the summary for the city
            const summary = new DailySummary({
                date: startOfDay,
                averageTemperature,
                maxTemperature,
                minTemperature,
                dominantWeatherCondition,
            });

            await summary.save();
            summaries.push({ summary, cityname });
        }

        // Return the summaries for all cities
        res.status(200).json(summaries);
    } catch (error) {
        console.error('Error in calculateDailySummary:', error);
        res.status(500).json({ message: 'Failed to calculate daily summary', error });
    }
};

module.exports = { calculateDailySummary };
