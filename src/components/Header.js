import React from 'react';

import {
    withStyles,
    AppBar,
    Toolbar, 
    Typography,
    Hidden,
} from '@material-ui/core';

import PlaybackControlsContainer from '../containers/PlaybackControlsContainer';

const styles = theme => ({
    '@keyframes marquee': {
        '0%': { transform: 'translate(100%, 0)' },
        '100%': { transform: 'translate(-100%, 0)' },
    },
    root: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        }
    },
    title: {
        flex: 1,
    },
    controls: {
        //flex: '1 0 auto',
    },
    playing: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    slide: {
        //animation: 'marquee 5s linear infinite',
    }
})

const Header = ({ classes, status }) => (
    <AppBar position="static" color='primary' >
        <Toolbar className={classes.root} >
            <div className={classes.title} >
                <Hidden xsDown implementation='css' >
                        <Typography variant="h6" color="inherit">Bethlehem</Typography>
                </Hidden>
            </div>
            <PlaybackControlsContainer className={classes.controls} />
            <div className={classes.playing} >
                <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.slide} >
                    {status}
                </Typography>
            </div>
        </Toolbar>
    </AppBar>
);

export default withStyles(styles)(Header);