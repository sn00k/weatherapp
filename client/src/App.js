import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import WeatherForm from './components/WeatherForm';
import WeatherCard from './components/WeatherCard';
import './App.scss';

class App extends Component {
  state = {
    fetching: false,
    showWeatherCard: false,
    searchString: '',
    searchStringFormatted: '',
    fetchFailed: false,
    weather: {
      id: 0,
      description: '',
      temp: '',
      timeNow: '',
      timeSunrise: '',
      timeSunset: '',
      lat: 0,
      long: 0,
    }
  }

  onSubmit = (searchString) => {
    this.setState({
      fetching: true,
      searchString: searchString
    })
    this.getWeatherData(searchString);
  }

  getWeatherData = async (searchString) => {
    // Fake latency from server
    setTimeout(() => {
      this.setState({
        fetching: false,
        showWeatherCard: true,
      })
    }, 1000);
    const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    const temperatureUnit = "&units=metric";
    const apiKey = `&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    const fullRequestUrl = apiUrl + searchString + temperatureUnit + apiKey;

    const response = await fetch(fullRequestUrl);
    const json = await response.json();
    if (json.cod === '404') {
      this.setState({fetchFailed: true})
      // add error handling
      return;
    }
    this.setState(prevState => ({
      fetchFailed: false,
      weather: {
        ...prevState.weather,
        id: json.weather[0].id,
        description: json.weather[0].description,
        temp: json.main.temp,
        lat: json.coord.lat,
        long: json.coord.lon
      },
      searchStringFormatted: `${json.name}, ${json.sys.country}`
    }));
    this.getLocalTimeForCity().then((result) => {
      this.setState(prevState => ({
        weather: {
          ...prevState.weather,
          timeNow: result.time,
          timeSunrise: result.sunrise,
          timeSunset: result.sunset
        }
      }));
    });
    // debug
    console.log(json);
  }

  getLocalTimeForCity = async () => {
    const latParam = this.state.weather.lat;
    const longParam = this.state.weather.long;
    const apiKey = process.env.REACT_APP_GEONAMES_USERNAME;
    const apiUrl = `http://api.geonames.org/timezoneJSON?lat=${latParam}&lng=${longParam}&username=${apiKey}`;

    const response = await fetch(apiUrl);
    return await response.json();
  }

  render() {
    const {showWeatherCard} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <WeatherForm onSubmit={this.onSubmit} />
          {showWeatherCard && <WeatherCard data={this.state} />}
        </header>
      </div>
    );
  }
}

export default App;
