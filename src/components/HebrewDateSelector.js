/**
 * Created by Michael Maschinoff
 * www.maschinoff.com
 * www.zeppit.pro
 * maschinov@zeppit.pro
 * Github: https://github.com/maschinoff
 * File: HebrewDateSelector
 * Date: 2/20/19
 * Time: 1:25 PM
 * Project: react-components
 */
import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

const styles = theme => ({
    grid: {
        width: '60%',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class HebrewDateSelector extends React.Component {
    state = {
        // The first commit of Material-UI
        gregorianDate: new Date(),
        hebrewDate: new Date(),
    };

    handleDateChange = date => {
        this.setState({ gregorianDate: date });
        this.setState({ hebrewDate: this.hebrewCalculate(date) });
    };

    hebrewCalculate = gregorian => {
        return gregorian;
    };

    render() {
        const { classes } = this.props;
        const { gregorianDate, hebrewDate } = this.state;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around">
                    <h3>Gregorian</h3>
                    <DatePicker
                        margin="normal"
                        label="Date picker"
                        value={gregorianDate.toString()}
                        onChange={this.handleDateChange}
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="Read Only"
                        value={gregorianDate.toString()}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </Grid>
                <Grid container className={classes.grid} justify="space-around">
                    <h3>Hebrew</h3>
                    <DatePicker
                        margin="normal"
                        label="Date picker"
                        value={hebrewDate.toString()}
                        onChange={this.handleDateChange}
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="Read Only"
                        value={hebrewDate.toString()}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        );
    }
}

HebrewDateSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HebrewDateSelector);