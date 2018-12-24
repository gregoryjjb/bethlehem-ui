import React from 'react';

import {
    withStyles,
    AppBar,
    Toolbar, 
    Typography,
    Hidden,
    IconButton,
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import PlaybackControlsContainer from '../containers/PlaybackControlsContainer';
import UnstyledLink from './UnstyledLink';

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
    editorBar: {
        display: 'flex',
        flexDirection: 'row',
    },
    backButton: {
        marginRight: 16,
    },
    editorTitle: {
        display: 'flex',
        alignItems: 'center',
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

const Header = ({ classes, status, editor = false }) => (
    <AppBar position="static" color='primary' >
        {editor ? (
            <Toolbar className={classes.editorBar}>
                <UnstyledLink to='/' className={classes.editorTitle}>
                    <IconButton color='inherit' className={classes.backButton}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant='h6' color='inherit'>Bethlehem Editor</Typography>
                </UnstyledLink>
            </Toolbar>
        ) : (
            <Toolbar className={classes.root} >
                <div className={classes.title} >
                    <Hidden xsDown implementation='css' >
                        <Typography variant="h6" color="inherit">
                            Bethlehem
                        </Typography>
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
        )}
    </AppBar>
);

export default withStyles(styles)(Header);