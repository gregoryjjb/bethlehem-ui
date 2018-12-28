import React from 'react';

import PlaybackControls from '../components/PlaybackControls';

import Store from '../utils/store';

class PlaybackControlsContainer extends React.Component {
    
    power = () => {
        const { store } = this.props;
        const status = store.get('player.status');
        
        if(status === 'off') {
            fetch('api/play/lightson');
        }
        else {
            fetch('api/play/lightsoff');
        }
    }
    
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
        const { store } = this.props;
        
        return (
            <PlaybackControls
                className={this.props.className}
                isOn={store.get('player.status') !== 'off'}
                onPowerClicked={this.power}
                onPlayClicked={this.playAll}
                onStopClicked={this.stop}
                onSkipClicked={this.skip} />
        )
    }
}

export default Store.withStore(PlaybackControlsContainer);