import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import WeatherForm from './components/WeatherForm';
import WeatherCard from './components/WeatherCard';
import './App.scss';

class App extends Component {
  state = {
    fetching: false,
    res: {},
    showWeatherCard: false
  }

  fetchData = async () => {
    this.setState({fetching: true})
    const apiUrl = process.env.REACT_APP_API_URL;
    const result = await fetch(apiUrl+'/api/weatherlocation');
    const json = await result.json();
    console.log(json);
    setTimeout(() => {
      // Fake latency from server
      this.setState({
        res: json,
        fetching: false,
      })
    }, 500);
  }

  onSubmit = (userInput) => {
    this.setState({fetching: true})
    this.setState({showWeatherCard: true})
    this.getWeatherData(userInput);
  }

  getWeatherData = (userInput) => {
    // Fake latency from server
    setTimeout(() => {
      this.setState({
        fetching: false
      })
    }, 1000);
  }

  render() {
    const {fetching, showWeatherCard} = this.state
    return (
      <div className="App">
        <header className="App-header">
          {/* <textarea readOnly value={JSON.stringify(this.state.res, null, 4)} style={{width: 500}} rows="5"></textarea>
          <br />
          <Button variant="contained" color="primary" onClick={this.fetchData} disabled={fetching}>
            {fetching ? 'Fetching...' : 'Fetch from backend'}
          </Button> */}
          <br />
          <WeatherForm onSubmit={this.onSubmit} />
          {showWeatherCard && <WeatherCard data={this.state} />}
        </header>
      </div>
    );
  }
}

export default App;
