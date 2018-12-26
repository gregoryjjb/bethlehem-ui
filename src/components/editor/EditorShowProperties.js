import React from 'react';

import {
    withStyles, Card, CardContent, Typography,
} from '@material-ui/core';

const styles = theme => ({
    root: {},
})

const EditorShowProperties = ({ classes }) => (
    <Card>
        <CardContent>
            <Typography variant='h6'>Properties</Typography>
        </CardContent>
    </Card>
);

export default withStyles(styles)(EditorShowProperties);