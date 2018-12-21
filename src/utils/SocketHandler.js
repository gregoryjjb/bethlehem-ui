import React from 'react';
import io from 'socket.io-client';
import Store from './store';

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
    }
    
    render() {
        return <React.Fragment />;
    }
}

export default Store.withStore(SocketHandler);