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
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {withStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers';
import Hebcal from 'hebcal';

const months = [
    'Nisan',
    'Iyyar',
    'Sivan',
    'Tamuz',
    'Av',
    'Elul',
    'Tishrei',
    'Cheshvan',
    'Kislev',
    'Tevet',
    'Sh\'vat',
    'Adar',
    'Adar 1',
    'Adar 2'
];

const yearsOffset = 70;

const styles = theme => ({
    grid: {
        width: '60%',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
});

class HebrewDateSelector extends React.Component {
    state = {
        gregorianDate: new Date(),
        hebrewDate: Hebcal.HDate(new Date()),
        disconnect: false
    };


    handleGregorianDateChange = date => {
        this.setState({gregorianDate: date});
    };

    handleHebrewDateChange = date => {
        this.setState({hebrewDate: date});
    };

    convertToGregorian = () => {
        if(!this.state.disconnect) {
            const date = new Hebcal.HDate(this.state.hebrewDate).greg();
            this.setState({gregorianDate: date});
        }
    };

    convertToHebrew = () => {
        if(!this.state.disconnect){
            const date = new Hebcal.HDate(this.state.gregorianDate);
            this.setState({hebrewDate: date});
        }
    };

    getHebrewDay = () => {
        const hebrewDay = this.state.hebrewDate.day;
        return hebrewDay;
    };

    getHebrewYear = () => {
        const hebrewYear = this.state.hebrewDate.year;
        return hebrewYear;
    };

    yearsSelector = () => {
        const years = [];
        const currentYear = this.state.hebrewDate.year;
        const endYear = currentYear - yearsOffset;
        for (let i = endYear; i <= currentYear; i++){
            years.push(i);
        }
        return years.reverse();
    }

    daysSelector = () => {
        const days = [];
        const currentMonthDays = this.state.hebrewDate.daysInMonth();
        for(let i = 1; i <= currentMonthDays; i++){
            days.push(i);
        }
        return days;
    }

    getHebrewMonth = () => {
        const hebrewMonth = this.state.hebrewDate.getMonthName();
        return hebrewMonth;
    };

    handleHebrewChange = event => {
        let date = this.state.hebrewDate;
        switch (event.target.name) {
            case 'hebrew-day':
                date.day = event.target.value;
                break;
            case 'hebrew-month':
                console.log(event.target.value);
                date.month = event.target.value;
                break;
            case 'hebrew-year':
                date.year = event.target.value;
                break;
        }
        this.setState({hebrewDate: date})
    };

    handleDisconnect = () => {
        this.setState({ disconnect: !this.state.disconnect});
    };

    render() {
        const {classes} = this.props;
        const {gregorianDate, hebrewDate} = this.state;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around">
                    <Grid item xs={2}>
                        <h3>Gregorian</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <DatePicker
                            margin="normal"
                            label="Date picker"
                            value={gregorianDate.toString()}
                            onChange={this.handleGregorianDateChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            color="primary"
                            onClick={this.convertToHebrew}
                        >
                            Convert to Hebrew
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
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
                </Grid>
                <Grid container className={classes.grid} justify="space-around">
                    <Grid item xs={2}>
                        <h3>Hebrew</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="hebrew-day">Day</InputLabel>
                            <Select
                                value={this.getHebrewDay()}
                                autoWidth={true}
                                onChange={this.handleHebrewChange}
                                input={<Input name="day" id="hebrew-day"/>}
                                name="hebrew-day"
                            >
                                <MenuItem value="">
                                    <em>Day</em>
                                </MenuItem>
                                {this.daysSelector().map((day) => <MenuItem key={day} value={day}><em>{day}</em></MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="hebrew-month">Month</InputLabel>
                            <Select
                                value={this.getHebrewMonth()}
                                autoWidth={true}
                                onChange={this.handleHebrewChange}
                                input={<Input name="year" id="hebrew-month"/>}
                                name="hebrew-month"
                            >
                                <MenuItem value="">
                                    <em>Month</em>
                                </MenuItem>
                                {months.map((month) => <MenuItem key={month} value={month}><em>{month}</em></MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="hebrew-year">Year</InputLabel>
                            <Select
                                value={this.getHebrewYear()}
                                autoWidth={true}
                                onChange={this.handleHebrewChange}
                                input={<Input name="year" id="hebrew-year"/>}
                                name="hebrew-year"
                            >
                                <MenuItem value="">
                                    <em>Year</em>
                                </MenuItem>
                                {this.yearsSelector().map((year) => <MenuItem key={year} value={year}><em>{year}</em></MenuItem>)}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            color="primary"
                            onClick={this.convertToGregorian}
                        >
                            Convert to Gregorian
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
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
                </Grid>
                <Grid container className={classes.grid} justify="space-around">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.disconnect}
                                onChange={this.handleDisconnect}
                                value={this.state.disconnect}
                            />
                        }
                        label="disconnect dates (when enable convert buttons doesn't work)"
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