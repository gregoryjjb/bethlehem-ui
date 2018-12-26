import api from './api';
import Store from './store';

const store = Store.instance;

export const fetchShows = () => {
    return new Promise((resolve, reject) => {
        store.set('shows.fetching')(true);
        
        api.getShows()
            .then(res => {
                store.set('shows')(res.data);
            })
            .catch(err => {
                store.set('shows.error')(err);
            })
            .then(() => {
                store.set('shows.fetching')(false);
                resolve();
            })
    })
}

export const fetchConfig = () => {
    return new Promise((resolve, reject) => {
        store.set('config.fetching')(true);
        
        api.getConfig()
            .then(res => {
                [
                    'gpioPinNumbers',
                    'useBoardPinNumbering',
                    'invertPinOutput',
                    'gpioLogging',
                    'interShowDelay'
                ].forEach(key => {
                    store.set(`config.${key}`)(res.data[key]);
                });
                store.set('config.error')('');
            })
            .catch(err => {
                store.set('config.error')(err.message);
            })
            .then(() => {
                store.set('config.fetching')(false);
                store.set('ready')(true);
                
                resolve();
            })
    })
}

export const openEditShowDialog = show => {
    
    store.set('editShowDialog.show')(show);
    store.set('editShowDialog.fetching')(false);
    store.set('editShowDialog.open')(true);
    
}

export const openCreateShowDialog = () => {
    store.set('createShowDialog.fetching')(false);
    store.set('createShowDialog.open')(true);
}