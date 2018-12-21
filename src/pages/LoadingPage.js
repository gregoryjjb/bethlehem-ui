import React from 'react';

import {
    withStyles, CircularProgress,
} from '@material-ui/core';

const styles = theme => ({
    root: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const LoadingPage = ({ classes }) => (
    <div className={classes.root}>
        <CircularProgress variant='indeterminate' />
    </div>
);

export default withStyles(styles)(LoadingPage);