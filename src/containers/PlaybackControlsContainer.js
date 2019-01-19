import React from 'react';

import PlaybackControls from '../components/PlaybackControls';
import Store from '../utils/store';
import { showNotification } from '../utils/actions';

const DEMO = process.env.REACT_APP_DEMO_MODE === 'true';

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

    demoCheck = msg => {
        if(DEMO) showNotification(msg || 'Demo mode; cannot play', 'warning');
    }
    
    playAll = () => {
        fetch('api/play/all');
        this.demoCheck();
    }
    
    stop = () => {
        fetch('api/play/stop');
        this.demoCheck();
    }
    
    skip = () => {
        fetch('api/play/skip');
        this.demoCheck();
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