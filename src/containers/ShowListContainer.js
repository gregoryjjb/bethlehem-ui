import React from 'react';
import Store from '../utils/store';

import ShowList from '../components/ShowList';

class ShowListContainer extends React.Component {
    
    componentDidMount() {
        fetch('api/shows')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.props.store.set('shows')(res);
            })
    }
    
    playShow = name => {
        if(this.props.store.get('shows').find(s => s.name === name).hasAudio) {
            fetch('api/play/single/' + name);
        }
        else {
            console.log("WHOOPS NO AUDIO")
        }
    }
    
    render() {
        return <ShowList
            shows={this.props.store.get('shows')}
            selectedShow={this.props.store.get('selectedShow')}
            showClicked={this.playShow} />;
    }
}

export default Store.withStore(ShowListContainer);