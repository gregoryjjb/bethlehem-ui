import React from 'react';
import ShowTable from '../components/ShowTable';
import Store from '../utils/store';

class ShowTableContainer extends React.Component {
    render() {
        const { store } = this.props;
        
        return(
            <ShowTable shows={store.get('shows')} />
        )
    }
}

export default Store.withStore(ShowTableContainer);