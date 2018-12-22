import React from 'react';
import io from 'socket.io-client';
import Store from './store';
import api from './api';

class SocketHandler extends React.Component {
    
    componentDidMount() {
        const { store } = this.props;
        
        const socket = io('/');
        
        socket.on('status_update', newStatus => {
            console.log("THE STATUS IS NOW", newStatus);
            
            store.set('player.status')(newStatus);
        })
        
        // Get config
        fetch('/api/config')
            .then(res => res.json())
            .then(res => {
                [
                    'gpioPinNumbers',
                    'useBoardPinNumbering',
                    'invertPinOutput',
                    'gpioLogging',
                    'interShowDelay'
                ].forEach(key => {
                    store.set(`config.${key}`)(res[key]);
                });
                store.set('ready')(true);
            })
        
        // Get shows
        api.getShows()
            .then(res => {
                store.set('shows')(res.data);
            })
    }
    
    render() {
        return <React.Fragment />;
    }
}

export default Store.withStore(SocketHandler);