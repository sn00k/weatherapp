import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.scss';

class App extends Component {
  state = {
    fetching: false,
    res: {},
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

  render() {
    const {fetching} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <textarea readOnly value={JSON.stringify(this.state.res, null, 4)} style={{width: 500}} rows="5"></textarea>
          <br />
          <Button variant="contained" color="primary" onClick={this.fetchData} disabled={fetching}>
            {fetching ? 'Fetching...' : 'Fetch from backend'}
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
