import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Store from '../utils/store';

import LoadingHandler from '../utils/LoadingHandler';
import AppLayout from './AppLayout';

import ShowPage from '../pages/ShowPage';
import SettingsPage from '../pages/SettingsPage';
import LoadingPage from '../pages/LoadingPage';
import ManagePage from '../pages/ManagePage';
import NotFoundPage from '../pages/NotFoundPage';

const EditorPage = lazy(() => import('../pages/EditorPage'));

const App = ({ store }) => (
        <BrowserRouter>
            <Suspense fallback={<LoadingPage />} >
                <CssBaseline />
                <LoadingHandler />
                {store.get('ready') ? (
                    <Switch>
                        <Route path='/editor/:project?' component={EditorPage} />
                        <Route render={() => (
                            <AppLayout>
                                <Switch>
                                    <Route path='/' exact component={ShowPage} />
                                    <Route path='/manage' component={ManagePage} />
                                    <Route path='/settings' component={SettingsPage} />
                                    <Route component={NotFoundPage} />
                                </Switch>
                            </AppLayout>
                        )}/>
                    </Switch>
                ) : (
                    <LoadingPage />
                )}
            </Suspense>
        </BrowserRouter>
)

export default Store.withStore(App);
