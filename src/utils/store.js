import  { createStore, createConnectedStore, withLogger, connect } from 'undux';

const initialState = {
    shows: [],
    selectedShow: '',
    'player.status': '...',
    
    ready: false,
    
    // Config
    'config.gpioPinNumbers': null,
    'config.invertPinOutput': false,
    'config.useBoardPinNumbering': false,
    'config.gpioLogging': true,
    'config.interShowDelay': 0,
    // Not a real config option
    'config.fetching': false,
    
    // Settings are what is shown in the settings page
    'settings.gpioPinNumbers': null,
    'settings.invertPinOutput': false,
    'settings.gpioLogging': true,
    'settings.interShowDelay': 0,
}

const store = withLogger(createStore(initialState));

const Store = {
    store,
    get: store.get,
    set: store.set,
    withStore: connect(store),
} //= createConnectedStore(initialState, withLogger);

export default Store;