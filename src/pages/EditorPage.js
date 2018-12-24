import React from 'react';

import {
    withStyles, Typography, IconButton, MuiThemeProvider,
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import TimelineContainer from '../containers/TimelineContainer';
import UnstyledLink from '../components/UnstyledLink';

import { DrawerContent } from '../components/SideMenu';
import { editorTheme } from '../utils/theme';
import EditorToolbar from '../components/editor/EditorToolbar';
import EditorShowList from '../components/editor/EditorShowList';

const styles = theme => ({
    root: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: theme.palette.background.default,
        display: 'grid',
        gridTemplateColumns: '[col-start] 280px [side-menu] auto [col-end]',
        gridTemplateRows: '[row-start] auto [toolbar] 80px [timeline] 528px [row-end]',
    },
    sideMenuArea: {
        gridColumnStart: 'col-start',
        gridColumnEnd: 'side-menu',
        gridRowStart: 'row-start',
        gridRowEnd: 'toolbar',
    },
    topArea: {
        gridColumnStart: 'side-menu',
        gridColumnEnd: 'col-end',
        gridRowStart: 'row-start',
        gridRowEnd: 'toolbar',
        // To make the thingy not go outside
        minHeight: 0,
        margin: 16,
    },
    toolbarArea: {
        gridColumnStart: 'col-start',
        gridColumnEnd: 'col-end',
        gridRowStart: 'toolbar',
        gridRowEnd: 'timeline',
    },
    timelineArea: {
        gridColumnStart: 'col-start',
        gridColumnEnd: 'col-end',
        gridRowStart: 'timeline',
        gridRowEnd: 'row-end',
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 64,
        marginLeft: 8,
    },
    backButton: {
        marginRight: 8,
    },
})

const EditorPage = ({ classes, match }) => (
        <div className={classes.root} >
            <div className={classes.sideMenuArea}>
                <div className={classes.title}>
                    <UnstyledLink to='/'>
                        <IconButton className={classes.backButton}>
                            <ArrowBackIcon />
                        </IconButton>
                    </UnstyledLink>
                    <Typography variant='h5'>Bethlehem Editor</Typography>
                </div>
                <DrawerContent />
            </div>
            <div className={classes.topArea}>
                <EditorShowList />
            </div>
            <div className={classes.toolbarArea}>
                <EditorToolbar />
            </div>
            <div className={classes.timelineArea}>
                <TimelineContainer />
            </div>
        </div>
);

const Temp = withStyles(styles)(EditorPage);

export default () => (
    <MuiThemeProvider theme={editorTheme}>
        <Temp />
    </MuiThemeProvider>
)