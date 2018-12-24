import React from 'react';
import EditShowDialog from '../components/EditShowDialog';
import Store from '../utils/store';
import api from '../utils/api';
import { fetchShows } from '../utils/actions';

class EditShowDialogContainer extends React.Component {
    
    handleClose = () => {
        this.props.store.set('editShowDialog.open')(false);
    }
    
    handleSubmit = results => {
        const { store } = this.props;
        
        store.set('editShowDialog.fetching')(true);
        
        const newShow = {
            ...store.get('editShowDialog.show'),
            ...results,
        };
        
        api.editShow(newShow)
            .then(res => {
                fetchShows();
                this.handleClose();
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                store.set('editShowDialog.fetching')(false);
            })
    }
    
    render() { 
        const { store } = this.props;
        
        return(
            <EditShowDialog
                open={store.get('editShowDialog.open')}
                show={store.get('editShowDialog.show')}
                fetching={store.get('editShowDialog.fetching')}
                onCancel={this.handleClose}
                onSubmit={this.handleSubmit} />
        )
    }
}

export default Store.withStore(EditShowDialogContainer);