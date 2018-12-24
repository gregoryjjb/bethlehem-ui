import React from 'react';
import ShowTable from '../components/ShowTable';
import Store from '../utils/store';
import { openEditShowDialog } from '../utils/actions';

class ShowTableContainer extends React.Component {
    
    handleEditClicked = show => {
        openEditShowDialog(show);
    }
    
    render() {
        const { store } = this.props;
        
        return(
            <ShowTable shows={store.get('shows')} editClicked={this.handleEditClicked} />
        )
    }
}

export default Store.withStore(ShowTableContainer);