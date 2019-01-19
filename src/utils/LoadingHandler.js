import React from 'react';
import io from 'socket.io-client';
import Store from './store';
import api from './api';

import { fetchShows, fetchConfig, showNotification } from '../utils/actions';

const DEMO = process.env.REACT_APP_DEMO_MODE === 'true';

class LoadingHandler extends React.Component {
    
    componentDidMount() {
        const { store } = this.props;
        
        if(!DEMO) {
            const socket = io('/');
            socket.on('status_update', newStatus => {
                console.log("THE STATUS IS NOW", newStatus);
                
                store.set('player.status')(newStatus);
            })
        }
        else {
            console.warn('Demo mode; not starting socket');
            showNotification('Demo mode; no server connected', 'warning');
        }
        
        // Get config
        fetchConfig();
        
        // Get shows
        fetchShows();
    }
    
    render() {
        return <React.Fragment />;
    }
}

export default Store.withStore(LoadingHandler);