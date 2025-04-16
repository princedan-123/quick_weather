import express from 'express';
import cors from 'cors';
import weather_router from './routes/weather.js';

const app = express();
app.use(cors());
app.use(weather_router);
app.listen(3000, '0.0.0.0', () => {
    console.log('Server is up and running!!');
})