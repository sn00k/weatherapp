import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { weatherIcon, tempUnitIcon } from '../utils';

const styles = {
  card: {
    minWidth: 398,
    marginTop: 20
  },
  title: {
    fontSize: 14
  },
  weather: {
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  temperature: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

class WeatherCard extends Component {
  render() {
    const { classes } = this.props;
    const fetchFailed = this.props.data.fetchFailed;

    if (fetchFailed) {
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Oops! Location not found. :(
            </Typography>
          </CardContent>
        </Card>
      );
    }

    const weatherId = this.props.data.weather.id;
    const weatherDescription = this.props.data.weather.description;
    const tempRounded = Math.round(this.props.data.weather.temp);
    const searchStringFormatted = this.props.data.searchStringFormatted;
    const timeNow = this.props.data.weather.timeNow;
    const timeSunrise = this.props.data.weather.timeSunrise;
    const timeSunset = this.props.data.weather.timeSunset;
    let isFetching = this.props.data.fetching;

    if (isFetching) {
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Loading...
            </Typography>
          </CardContent>
        </Card>
      );
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {searchStringFormatted}
          </Typography>
          <Typography variant="h5" component="h2" className={classes.temperature}>
            <p className="weather__inline-block">{tempRounded}</p>
            <img className="weather__inline-block weather__unit-icon" src={tempUnitIcon(1)} alt='Weather unit icon'/>
          </Typography>
          <Typography className={classes.weather} color="textSecondary">
            <img src={weatherIcon(weatherId, timeNow, timeSunrise, timeSunset)} className="weather__inline-block" alt='Weather icon'/>
            <template className="weather__inline-block weather__item__margin-left">{weatherDescription}</template>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

WeatherCard.propTypes = {
  classes: PropTypes.object.isRequired
};

// For my own knowledge:
// withStyles is a component from material ui that wraps my component and passes styles
export default withStyles(styles)(WeatherCard);
