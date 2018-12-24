import React from 'react';
import { Link } from 'react-router-dom';

import {
    withStyles,
} from '@material-ui/core';

const styles = theme => ({
    root: {
        color: 'unset',
        textDecoration: 'none',
        '&:hover': {
            color: 'unset',
            textDecoration: 'none',
        }
    },
})

const UnstyledLink = ({ classes, className, children, to = '' }) => (
    <Link className={classes.root + ' ' + className} to={to}>
        {children}
    </Link>
);

export default withStyles(styles)(UnstyledLink);