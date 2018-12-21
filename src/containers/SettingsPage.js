import React from 'react';

import {
    withStyles, Typography,
} from '@material-ui/core';
import PageContents from '../components/PageContents';
import SettingsCard from '../components/SettingsCard';
import SettingsContainer from './SettingsContainer';

const styles = theme => ({
    root: {},
})

const SettingsPage = ({ classes }) => (
    <PageContents title='Settings' narrow >
        <SettingsContainer />
    </PageContents>
);

export default withStyles(styles)(SettingsPage);