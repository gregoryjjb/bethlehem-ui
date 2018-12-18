import React from 'react';

import {
    withStyles,
} from '@material-ui/core';

const styles = theme => ({
    root: {
        padding: 24,
        [theme.breakpoints.down('xs')]: {
            padding: 16,
        }
    },
})

const PageContents = ({ classes, narrow = false, children }) => (
    <div style={{
        margin: '0 auto',
        maxWidth: narrow ? 800 : 1000,
    }} >
        <div className={classes.root} >
            {children}
        </div>
    </div>
);

export default withStyles(styles)(PageContents);