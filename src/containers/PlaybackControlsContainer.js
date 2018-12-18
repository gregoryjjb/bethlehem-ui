import React from 'react';

import PlaybackControls from '../components/PlaybackControls';

class PlaybackControlsContainer extends React.Component {
    
    playAll = () => {
        console.log("What")
        fetch('/play/all');
    }
    
    stop = () => {
        fetch('/play/stop');
    }
    
    skip = () => {
        fetch('/play/skip');
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