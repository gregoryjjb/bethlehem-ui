import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
//import * as serviceWorker from './serviceWorker';

import theme from './utils/theme';
import { MuiThemeProvider } from '@material-ui/core';
import Store from './utils/store';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        
            
                <App />
            
        
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
