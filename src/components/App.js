import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Store from '../utils/store';

import SocketHandler from '../utils/SocketHandler';
import AppLayout from './AppLayout';

import ShowPage from '../pages/ShowPage';
import SettingsPage from '../pages/SettingsPage';
import LoadingPage from '../pages/LoadingPage';
import ManagePage from '../pages/ManagePage';

const App = ({ store }) => (
        <BrowserRouter>
            <div>
                <CssBaseline />
                <SocketHandler />
                {store.get('ready') ? (
                    <AppLayout>
                        <Switch>
                            <Route path='/' exact component={ShowPage} />
                            <Route path='/manage' component={ManagePage} />
                            <Route path='/settings' component={SettingsPage} />
                        </Switch>
                    </AppLayout>
                ) : (
                    <LoadingPage />
                )}
            </div>
        </BrowserRouter>
)

export default Store.withStore(App);
