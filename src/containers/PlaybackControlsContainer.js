import React from 'react';

import PlaybackControls from '../components/PlaybackControls';

class PlaybackControlsContainer extends React.Component {
    
    playAll = () => {
        console.log("What")
        fetch('api/play/all');
    }
    
    stop = () => {
        fetch('api/play/stop');
    }
    
    skip = () => {
        fetch('api/play/skip');
    }
    
    render() {
        return (
            <PlaybackControls
                className={this.props.className}
                onPlayClicked={this.playAll}
                onStopClicked={this.stop}
                onSkipClicked={this.skip} />
        )
    }
}

export default PlaybackControlsContainer;