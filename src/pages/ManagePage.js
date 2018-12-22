import React from 'react';

import {
    withStyles,
} from '@material-ui/core';
import PageContents from '../components/PageContents';
//import ShowTable from '../components/ShowTable';
import ShowTableContainer from '../containers/ShowTableContainer';

const styles = theme => ({
    root: {},
})

const ManagePage = ({ classes }) => (
    <PageContents title='Manage' >
        <ShowTableContainer />
    </PageContents>
);

export default withStyles(styles)(ManagePage);