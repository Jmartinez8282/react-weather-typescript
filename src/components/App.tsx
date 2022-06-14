
import React, { FC, useState} from 'react';
import { LocationSearch } from './LocationSearch';
import { LocationTable } from './LocationTable';
import './App.css';
import { WeatherLocation } from '../model/Weather';
import { searchLocation } from '../services/WeatherService';
import { ErrorAlert, WarningAlert } from './Alerts';

const App: FC = () => {


  const [currentlocation, setCurrentLocation] = useState<WeatherLocation | null>(null);
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const addLocation = (location: string) => setLocations([location, ...locations]);

  return (
    <div className="container">
      <h1>Weather App</h1>

      <LocationSearch onSearch={addLocation}/>
      <LocationTable locations={locations}
      current={currentlocation}
      onSelect={location => setCurrentLocation(location)}/>
    </div>
  );
}

export default App;