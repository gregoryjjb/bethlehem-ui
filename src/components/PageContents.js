import React from 'react';

import {
    withStyles, Typography,
} from '@material-ui/core';
import GlobalError from './GlobalError';

const styles = theme => ({
    root: {
        padding: 24,
        [theme.breakpoints.down('xs')]: {
            padding: 16,
        }
    },
})

const PageContents = ({ classes, title, narrow = false, children, ...props }) => (
    <div style={{
        margin: '0 auto',
        maxWidth: narrow ? 800 : 1000,
    }} >
        <div className={classes.root} {...props} >
            <GlobalError />
            {title && <Typography variant='h2' gutterBottom>{title}</Typography>}
            {children}
        </div>
    </div>
);

export default withStyles(styles)(PageContents);