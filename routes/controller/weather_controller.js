import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const weatherAPI_key = process.env['weatherAPI_key']
const weatherController = {
    async currentWeatherAPI(req, res, next) {
        const location =  req.query['location'];
        const url = 'https://api.weatherapi.com/v1/current.json'
        try {
            const response = await axios.get(url, {
                params: {
                    'key': weatherAPI_key,
                    'q': location,
                    'aqi': 'yes'
                }
            })
            const weatherReport = {
                name: response.data.location.name,
                region: response.data.location.region,
                country: response.data.location.country,
                localTime: response.data.location.localtime,
                temp_in_celcius: response.data.current.temp_c,
                condition: response.data.current.condition.text,
                icon: response.data.current.condition.icon,
                wind_in_kmph: response.data.current.wind_kph,
                wind_degree: response.data.current.wind_degree,
                wind_dir: response.data.current.wind_dir,
                Source: 'WeatherAPI'
            };
            return res.json(weatherReport);
        }
        catch (error) {
            if (error.response.status === 400) {
                console.log(res.statusCode)
                return res.status(400).json({
                    'error': error.response.statusText,
                    'code': error.response.status,
                    'message': 'No matching location found or location incorrect'
                })
            }
            else {
                return res.status(error.response.status).json({
                    'error': 'most likely server error'
                })
            }
        }
    }
};
export default weatherController;