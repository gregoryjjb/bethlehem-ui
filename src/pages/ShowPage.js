import React from 'react';

import {
    withStyles,
} from '@material-ui/core';

import PageContents from '../components/PageContents';
import ShowListContainer from "../containers/ShowListContainer";

const styles = theme => ({
    root: {},
})

const ShowPage = ({ classes }) => (
    <PageContents title='Show' narrow>
        <ShowListContainer />
    </PageContents>
);

export default withStyles(styles)(ShowPage);