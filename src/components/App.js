import React, { Component } from 'react';
import { CssBaseline } from '@material-ui/core';

import Store from '../utils/store';
import ShowListContainer from '../containers/ShowListContainer';

import HeaderContainer from '../containers/HeaderContainer';
import PageContents from './PageContents';
import SocketHandler from '../utils/SocketHandler';
import AppLayout from './AppLayout';

const App = ({ }) => (
    <Store.Container>
        <CssBaseline />
        <SocketHandler />
        <AppLayout>
            <PageContents narrow>
                <ShowListContainer />
            </PageContents>
        </AppLayout>
    </Store.Container>
)

export default App;
