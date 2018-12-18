import  { createConnectedStore } from 'undux';

const initialState = {
    shows: [],
    selectedShow: '',
    'player.status': '...',
}

const Store = createConnectedStore(initialState);

export default Store;

