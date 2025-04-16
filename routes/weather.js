import express from 'express';
import weatherController from './controller/weather_controller.js';

const weather_router = express.Router();
weather_router.get('/current/weather_api', weatherController.currentWeatherAPI);
export default weather_router;