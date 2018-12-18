import React from 'react';

import {
    withStyles,
    Button,
} from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '8px 0',
    },
    rounded: { 
        borderRadius: 100,
        margin: 4,
    },
    circle: {
        borderRadius: 100,
        minWidth: 0,
        padding: 8,
        margin: 4,
    },
    icon: {
        marginRight: 8,
    },
})

const PlaybackControls = ({ classes, className, onPlayClicked, onStopClicked, onSkipClicked }) => (
    <div className={classes.root + ' ' + className} >
        <Button className={classes.circle} variant="contained" color="secondary" >
            <FastRewindIcon />
        </Button>
        <Button
            className={classes.rounded}
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => onPlayClicked()} >
            <PlayArrowIcon className={classes.icon} />
            Play all
        </Button>
        <Button
            className={classes.circle}
            size="large"
            variant="contained"
            color="secondary"
            onClick={onStopClicked} >
            <StopIcon />
        </Button>
        <Button
            className={classes.circle}
            size="large"
            variant="contained"
            color="secondary"
            onClick={onSkipClicked} >
            <FastForwardIcon />
        </Button>
    </div>
);

export default withStyles(styles)(PlaybackControls);