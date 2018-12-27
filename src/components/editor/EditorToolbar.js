import React from 'react';

import {
    withStyles, IconButton, Button, Divider, Fab, Typography,
} from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import SaveIcon from '@material-ui/icons/Save';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import OutlinedSelect from '../form/Select';
import Timeline from '../../utils/timeline';
import Store from '../../utils/store';
import api from '../../utils/api';
import { showNotification } from '../../utils/actions';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    row: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '0 24px',
    },
    select: {
        width: 160,
        margin: '0 8px',
    },
    button: {
        margin: '0 8px',
    },
    icon: {
        marginRight: 8,
    },
    title: {
        flex: 1,
        marginLeft: 8,
    }
});

const speeds = {
    normal: 1,
    half: 0.5,
    quarter: 0.25,
}

class EditorToolbar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            speed: 'normal',
        }
        
        this.disabled = false;
    }
    
    handleSpeedChange = e => {
        this.setState({ speed: e.target.value });
        Timeline.wavesurfer.setPlaybackRate(speeds[e.target.value]);
    }
    
    handlePlayPause = e => {
        Timeline.wavesurfer.playPause();
        this.props.store.set('editor.playing')(Timeline.wavesurfer.isPlaying());
    }
    
    handleStop = e => {
        Timeline.wavesurfer.stop();
        Timeline.time = 0;
        this.props.store.set('editor.playing')(false);
    }
    
    handleSave = e => {
        const project = Timeline.getProjectObject();
        const name = this.props.store.get('editor.show').name;
        api.saveShowProject(name, project)
            .then(res => {
                showNotification('Saved', 'success');
            });
    }
    
    makeButton = (label, Icon, onClick) => (
        <Button
            variant='contained'
            color='primary'
            className={this.props.classes.button}
            disabled={this.disabled}
            onClick={onClick}>
            {Icon && <Icon className={this.props.classes.icon} />}
            {label}
        </Button>
    )
    
    makeFab = (Icon, onClick) => (
        <Fab
            color='secondary'
            className={this.props.classes.button}
            disabled={this.disabled}
            onClick={onClick}>
            {Icon && <Icon />}
        </Fab>
    )
    
    render() {
        const { classes, store } = this.props;
        const { speed } = this.state;
        
        const playing = store.get('editor.playing');
        const show = store.get('editor.show');
        
        this.disabled = show === null;
        
        return(
            <div className={classes.root}>
                <Divider />
                <div className={classes.row}>
                    {this.makeFab(
                        playing ? PauseIcon : PlayArrowIcon,
                        this.handlePlayPause
                    )}
                    {this.makeFab(StopIcon, this.handleStop)}
                    <OutlinedSelect
                        label='Playback Speed'
                        value={speed}
                        onChange={this.handleSpeedChange}
                        options={[
                            { value: 'normal', label: '1.0x (Normal)' },
                            { value: 'half', label: '0.5x' },
                            { value: 'quarter', label: '0.25x' },
                        ]}
                        className={classes.select} />
                    <IconButton
                        disabled={this.disabled}
                        className={classes.button}
                        onClick={this.handleSave}>
                        <SaveIcon />
                    </IconButton>
                    <Typography variant='h5' className={classes.title} >
                        {show ? show.displayName : 'Please open a show'}
                    </Typography>
                    {this.makeButton('Align', CompareArrowsIcon, () => Timeline.performAlign())}
                    {this.makeButton('Remove Dups', FlipToFrontIcon, () => Timeline.removeDuplicateKeyframes())}
                    {this.makeButton('Invert', Brightness4Icon, () => Timeline.setKeyframesOn())}
                </div>
            </div>
        );
    }
}

EditorToolbar.defaultProps = {
    isPlaying: false,
}

export default Store.withStore(withStyles(styles)(EditorToolbar));