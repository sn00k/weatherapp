import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
// import WeatherCard from 'WeatherCard';
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class WeatherList extends Component {
  async componentDidMount() {
    await this.getSavedWeather();
    // const apiUrl = process.env.REACT_APP_API_URL + "/api/weatherlocation";
    // const response = await fetch(apiUrl);
    // const json = await response.json();
    // this.setState({json})
  }

  getSavedWeather = async () => {
    const apiUrl = process.env.REACT_APP_API_URL + "/api/weatherlocation";
    const response = await fetch(apiUrl);
    const json = await response.json();
    console.log(json);
  }
  
  render() {
    const ListItemLink = (props) => {
      return <ListItem button component="a" {...props} />;
    }

    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <List>
          <Card>
            <CardContent onLoad={this.getSavedWeather}>
              Saved weather 1
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              Weather 2
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              Weather 3
            </CardContent>
          </Card>
        </List>
      </div>
    );
  }
}

WeatherList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WeatherList);