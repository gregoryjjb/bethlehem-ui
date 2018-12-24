import React from 'react';

import {
    withStyles, Typography, Button,
} from '@material-ui/core';
import PageContents from '../components/PageContents';
import UnstyledLink from '../components/UnstyledLink';

const styles = theme => ({
    root: {},
})

const NotFoundPage = ({ classes }) => (
    <PageContents title='404 Not Found' narrow >
        <Typography variant='h5' gutterBottom>
            The page is invalid, likely due to an incorrect URL.
        </Typography>
        <UnstyledLink to='/'>
            <Button variant='outlined' color='secondary' >Go home</Button>
        </UnstyledLink>
    </PageContents>
);

export default withStyles(styles)(NotFoundPage);