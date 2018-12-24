import React from 'react';

import {
    withStyles, Typography,
} from '@material-ui/core';
import Store from '../utils/store';

const styles = theme => ({
    root: {},
})

const GlobalError = ({ classes, store }) => (
    store.get('config.error') ?
        <Typography
            variant='h6'
            color='error'
            gutterBottom>
            Error connecting to server: {store.get('config.error')}
        </Typography>
        : null
);

export default Store.withStore(withStyles(styles)(GlobalError));