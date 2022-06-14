import { readWeather, readForecast } from "../services/WeatherService";
import React, {FC, useEffect, useState} from 'react';
import { Weather, WeatherLocation } from "../model/Weather";
import {WeatherEntry} from '../components/WeatherEntry';





interface WeatherSummyProps{
    location: WeatherLocation | null;
}


export const WeatherSummary: FC<WeatherSummyProps> = ({location}) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [forecast, setForecast] = useState<Weather[] | null>(null);


    useEffect(() => {
        (async function () {
            if(location) {
                const [weather,forecast] = await Promise.all([
                    readWeather(location.id),
                    readForecast(location.id)
                ]);
                setWeather(weather);
                setForecast(forecast);
            }
        })();
    },[location]);

    if(!location || !weather || !forecast) return null;
        
        return (
            <div>

                <hr/>

                <h3>{location.name}</h3>

                <WeatherEntry weather={weather}/>

                <h2>ForeCast</h2>

                <div>
                    <ol>
                        {forecast.map(timePoint =>
                            <li key={timePoint.dt}>
                                <WeatherEntry weather={timePoint}/>
                            </li>
                            )}
                    </ol>

                </div>

            </div>
        );
        

}