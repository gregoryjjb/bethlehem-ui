import React from 'react';
import PropTypes from 'prop-types';

import {
    withStyles, Card, CardContent, Typography, TextField,
} from '@material-ui/core';

import Form from './form/Form';

const styles = theme => ({
    root: {},
    form: {
        //maxWidth: 350,
    }
})

class SettingsCard extends React.Component {
    minutesToDate = minutes => {
        const h = Math.floor(minutes / 60);
        const m = Math.floor(minutes % 60);
        const d = new Date();
        d.setHours(h);
        d.setMinutes(m);
        return d;
    }
    
    render() {
        const { classes, config, onSubmit, fetching } = this.props;
        
        let startDate = this.minutesToDate(config.autoStartTime);
        let endDate = this.minutesToDate(config.autoEndTime);
        
        return (
            <Card>
                <CardContent>
                    <div className={classes.form}>
                        <Form fields={[{
                            name: 'gpioPinNumbers',
                            label: 'Channel Pin Numbers',
                            helperText: 'Sets the GPIO pin numbers used to control the show',
                            defaultValue: config.gpioPinNumbers,
                            type: 'text',
                            required: true,
                            validation: s => (
                                (/^(\d+)(,\d+)*,?$/.test(s.replace(/\s+/g, '')))
                                    ? ''
                                    : 'Please enter a comma-separated list of numbers'
                            ),
                        }, {
                            name: 'useBoardPinNumbering',
                            label: 'Numbering Scheme',
                            helperText: <>See <a href="https://pinout.xyz" target='_blank' rel='noopener noreferrer'>here</a> for more info on pin numbering</>,
                            type: 'select',
                            defaultValue: config.useBoardPinNumbering,
                            options: [{ value: false, label: 'BCM' }, { value: true, label: 'Board' }]
                        }, {
                            name: 'invertPinOutput',
                            label: 'Invert GPIO Pin Output',
                            helperText: 'Check this box if your lights turn on when the GPIO pin is pulled low',
                            type: 'checkbox',
                            defaultValue: config.invertPinOutput,
                        }, {
                            name: 'interShowDelay',
                            label: 'Inter-song Delay',
                            helperText: 'Sets the time that the lights stay still between songs when in a playlist',
                            type: 'number',
                            units: 'seconds',
                            required: true,
                            defaultValue: config.interShowDelay,
                            validation: n => n >= 0 && n <= 3600 ? '' : 'Must be between 0 and an hour',
                        }, {
                            name: 'autoStart',
                            label: 'Automatic Start',
                            helperText: 'If enabled, will automatically "Play All" and stop at the specified times',
                            type: 'checkbox',
                            defaultValue: config.autoStart,
                            divider: false,
                        }, {
                            name: 'autoStartTime',
                            label: 'Start Time',
                            type: 'time',
                            defaultValue: startDate,
                            divider: false,
                        }, {
                            name: 'autoEndTime',
                            label: 'End Time',
                            type: 'time',
                            defaultValue: endDate,
                        }]}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            submitText='Apply'
                            divider
                            onSubmit={onSubmit}
                            fetching={fetching} />
                        
                    </div>
                </CardContent>
            </Card>
        )
    }
}

SettingsCard.propTypes = {
    config: PropTypes.shape({
        gpioPinNumbers: PropTypes.string,
    }),
}

export default withStyles(styles)(SettingsCard);