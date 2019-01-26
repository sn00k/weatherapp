import React, { Component } from 'react';
import { Paper, Typography, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import './WeatherForm.scss';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    minWidth: 350
  },
});

class WeatherForm extends Component {
  state = {
      text: "",
      title: ""
    };

  onSubmit = async e => {
      e.preventDefault();
      this.props.onSubmit(this.state.text);
      this.setState({ text: "" });
    };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
          <form onSubmit={this.onSubmit}>
            <TextField
              placeholder="Format: city,country code."
              value={this.state.text}
              fullWidth
              onChange={e => this.setState({ text: e.target.value })}
            />
            <p>E.g. new york,us</p>
          </form>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(WeatherForm);