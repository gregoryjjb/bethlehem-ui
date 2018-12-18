import  { createConnectedStore } from 'undux';

const initialState = {
    shows: [],
    selectedShow: '',
}

export default createConnectedStore(initialState);