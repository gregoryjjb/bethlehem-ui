import React from 'react';

import {
    withStyles, Card, CardContent, Table, TableHead, TableRow, TableCell, Typography, TableBody, IconButton, Button, CardActions
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        
    },
    tableOverflow: {
        overflowX: 'auto',
    },
    buttonIcon: {
        marginRight: 8,
    },
})

const boolToCell = (bool, classes) => (
    <TableCell
        align='right'
        style={{
            color: bool ? 'green' : 'red',
        }}>
        {bool ? 'Yes' : 'No'}
    </TableCell>
)

const ShowTable = ({ classes, shows = [], editClicked, addClicked }) => (
    <Card className={classes.root} >
        <CardContent>
            <Typography variant='h6'>Songs</Typography>
        </CardContent>
        <div className={classes.tableOverflow}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Audio</TableCell>
                        <TableCell align='right'>Source</TableCell>
                        <TableCell align='right'>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shows.map(show => (
                        <TableRow key={show.name}>
                            <TableCell>{show.displayName}</TableCell>
                            {boolToCell(show.hasAudio)}
                            {boolToCell(show.hasSource)}
                            <TableCell padding='checkbox' align='right' >
                                <IconButton onClick={() => editClicked && editClicked(show.id)}>
                                    <EditIcon fontSize='small' />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {shows.length === 0 &&
                        <CardContent>
                            <Typography
                                variant='subtitle1'
                                color='textSecondary'
                                gutterBottom>
                                There doesn't seem to be anything here
                            </Typography>
                        </CardContent>
                    }
                </TableBody>
            </Table>
        </div>
        <CardActions>
            <Button
                variant='outlined'
                color='primary'
                onClick={addClicked}>
                <AddIcon className={classes.buttonIcon} />
                Add new
            </Button>
        </CardActions>
    </Card>
);

ShowTable.propTypes = {
    
}

export default withStyles(styles)(ShowTable);