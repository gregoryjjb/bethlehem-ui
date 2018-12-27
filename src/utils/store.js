import  { createStore, createConnectedStore, withLogger, connect } from 'undux';

const initialState = {
    shows: [],
    'shows.fetching': false,
    'shows.error': '',
    
    selectedShow: '',
    'player.status': '...',
    
    // UI
    ready: false,
    error: '',
    'ui.notifications': [],
    
    // Config
    'config.gpioPinNumbers': null,
    'config.invertPinOutput': false,
    'config.useBoardPinNumbering': false,
    'config.gpioLogging': true,
    'config.interShowDelay': 0,
    // Not real config options
    'config.fetching': false,
    'config.error': '',
    
    // Show edit dialog
    'editShowDialog.show': null,
    'editShowDialog.open': false,
    'editShowDialog.fetching': false,
    
    // Show create dialog
    'createShowDialog.open': false,
    'createShowDialog.fetching': false,
    
    'editor.playing': false,
    'editor.show': null,
}

const store = withLogger(createStore(initialState));

const Store = {
    instance: store,
    get: key => store.get(key),
    set: key => value => store.set(key)(value),
    withStore: connect(store),
} //= createConnectedStore(initialState, withLogger);

export default Store;