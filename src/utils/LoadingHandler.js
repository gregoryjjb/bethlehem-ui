import React from 'react';
import io from 'socket.io-client';
import Store from './store';
import api from './api';

import { fetchShows, fetchConfig } from '../utils/actions';

class LoadingHandler extends React.Component {
    
    componentDidMount() {
        const { store } = this.props;
        
        const socket = io('/');
        
        socket.on('status_update', newStatus => {
            console.log("THE STATUS IS NOW", newStatus);
            
            store.set('player.status')(newStatus);
        })
        
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