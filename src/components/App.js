import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Store from '../utils/store';

import SocketHandler from '../utils/SocketHandler';
import AppLayout from './AppLayout';

import ShowPage from '../pages/ShowPage';
import SettingsPage from '../containers/SettingsPage';
import LoadingPage from '../pages/LoadingPage';

const App = ({ store }) => (
        <>
            <CssBaseline />
            <SocketHandler />
            {store.get('ready') ? (
                <AppLayout>
                    <Switch>
                        <Route path='/' exact component={ShowPage} />
                        <Route path='/settings' component={SettingsPage} />
                    </Switch>
                </AppLayout>
            ) : (
                <LoadingPage />
            )}
        </>
)

export default Store.withStore(App);
