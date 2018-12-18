import React from 'react';
import Store from '../utils/store';
import Header from '../components/Header';

class HeaderContainer extends React.Component {
    
    render() {
        const status = this.props.store.get('player.status')
        
        return <Header status={status} />;
    }
}

export default Store.withStore(HeaderContainer);