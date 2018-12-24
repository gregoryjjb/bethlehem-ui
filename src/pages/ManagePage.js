import React from 'react';

import {
    withStyles,
} from '@material-ui/core';
import PageContents from '../components/PageContents';
//import ShowTable from '../components/ShowTable';
import ShowTableContainer from '../containers/ShowTableContainer';
import EditShowDialogContainer from '../containers/EditShowDialogContainer';

const styles = theme => ({
    root: {},
})

const ManagePage = ({ classes }) => (
    <PageContents title='Manage' >
        <ShowTableContainer />
        <EditShowDialogContainer />
    </PageContents>
);

export default withStyles(styles)(ManagePage);