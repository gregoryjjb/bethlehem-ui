import React from 'react';

import {
    withStyles, Typography,
} from '@material-ui/core';
import Store from '../utils/store';

const styles = theme => ({
    root: {},
})

const StatusDisplay = ({ classes, className, store }) => {
    const getDisplayName = name => {
        if(!name) return '?something?';
        const shows = store.get('shows');
        if(!shows) return name;
        return shows.find(s => s.name === name).displayName;
    }
    
    let status = '???';
    
    const arr = store.get('player.status').split(':');
    
    const code = arr[0];
    
    if(code === 'off') status = 'Lights off';
    else if(code === 'on') status = 'Lights on';
    else if(code === 'playing') status = 'Now playing: ' + getDisplayName(arr[1]);
    else if(code === 'next') status = 'Up next: ' + getDisplayName(arr[1]);
    else status = code;
    
    return (
        <Typography variant='h6' color='inherit'>{status}</Typography>
    )
}

export default Store.withStore(withStyles(styles)(StatusDisplay));