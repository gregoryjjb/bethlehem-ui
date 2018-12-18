import React from 'react';

import {
    withStyles,
    AppBar,
    Toolbar, 
    Typography,
} from '@material-ui/core';

import PlaybackControlsContainer from '../containers/PlaybackControlsContainer';

const styles = theme => ({
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
    }
})

const Header = ({ classes }) => (
    <AppBar position="static" color='primary' >
        <Toolbar className={classes.root} >
            <div className={classes.title} >
                <Typography variant="h6" color="inherit">Bethlehem</Typography>
            </div>
            <PlaybackControlsContainer className={classes.controls} />
            <div className={classes.playing} >
                {/*<Typography variant="h6" color="inherit">NowPlayingHere</Typography>*/}
            </div>
        </Toolbar>
    </AppBar>
);

export default withStyles(styles)(Header);