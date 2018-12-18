import React from 'react';

import {
    withStyles,
    Card,
    CardContent,
    Divider,
    Typography,
} from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import WarningIcon from '@material-ui/icons/Warning';

import SelectableList from './form/SelectableList';
import ClickableList from './form/ClickableList';

const styles = theme => ({
    root: {
        marginBottom: 16,
    },
    listArea: {
    },
    buttonArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '8px 0',
    },
})

const ShowList = ({ classes, shows = [], playlists = [], showClicked, setSelectedShow }) => (
    <React.Fragment>
        <Card className={classes.root} >
            <CardContent>
                <Typography variant='h5' gutterBottom>Shows</Typography>
                <Divider/>
                <ClickableList
                    items={shows.map(show => ({
                        value: show.name,
                        label: show.displayName,
                        icon: show.hasAudio ? <PlayArrowIcon /> : <WarningIcon color='error' />
                    }))}
                    onItemClick={name => showClicked(name)} />
            </CardContent>
        </Card>
        <Card className={classes.root} >
            <CardContent>
                <Typography variant='h5' gutterBottom>Playlists</Typography>
                <Divider />
                <ClickableList items={playlists} />
                {playlists.length === 0 && (
                    <Typography
                        variant='subtitle1'
                        color="textSecondary"
                        gutterBottom >
                        There doesn't seem to be anything here
                    </Typography>    
                )}
            </CardContent>
        </Card>
    </React.Fragment>
);

export default withStyles(styles)(ShowList);