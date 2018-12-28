import React from 'react';

import {
    withStyles, List, ListItem, ListItemText, Hidden, Drawer, SwipeableDrawer, Fab, Toolbar, Typography, Divider, ListItemIcon,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import SettingsIcon from '@material-ui/icons/Settings';

import UnstyledLink from './UnstyledLink';

const drawerWidth = 280;

const styles = theme => ({
    root: {
        width: drawerWidth,
        position: 'relative',
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
    },
    fixed: {
        width: drawerWidth,
        height: '100%',
        position: 'fixed',
    },
    drawerPaper: {
		width: drawerWidth,
		position: 'relative',
		display: 'flex',
		flex: '0 0 auto',
	},
    drawerContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    fab: {
        position: 'fixed',
        left: 24,
        bottom: 24,
        zIndex: 1500,
    }
});

const links = [{
    name: 'Show',
    to: '/',
    icon: <HomeIcon />,
}, {
    name: 'Manage',
    to: '/manage',
    icon: <ViewListIcon />
}, {
    name: 'Editor',
    to: '/editor',
    icon: <MusicVideoIcon />
}, {
    name: 'Settings',
    to: '/settings',
    icon: <SettingsIcon />
}]

export const DrawerContent = ({ closeClicked, classes }) => (
    <div style={{ display: 'flex', flexDirection: 'column' }} >
        <List>
            {links.map(l => (
                <UnstyledLink to={l.to} key={l.name}>
                    <ListItem button onClick={closeClicked} >
                        <ListItemIcon>
                            {l.icon}
                        </ListItemIcon>
                        <ListItemText primary={l.name} />
                    </ListItem>
                </UnstyledLink>
            ))}
        </List>
    </div>
)

const SideMenu = ({ classes, isOpen, onOpen, onClose, spacerHeight }) => (
    <>
        <Hidden mdDown implementation='css' >
            <div className={classes.root}>
                <div className={classes.fixed} >
                    <Drawer
                        style={{ height: '100%' }}
                        variant='permanent'
                        open
                        classes={{ paper: classes.drawerPaper }} >
                        {/* Spacer goes here */}
                        <DrawerContent classes={classes} closeClicked={onClose} />
                    </Drawer>
                </div>
            </div>
        </Hidden>
        <Hidden lgUp implementation='css' >
            <SwipeableDrawer
                variant='temporary'
                anchor='left'
                open={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                classes={{ paper: classes.drawerPaper }}
                ModalProps={{ keepMounted: true }} >
                {/* Spacer goes here */}
                <Toolbar style={{ height: spacerHeight }} >
                    <Typography variant='h5'>Bethlehem</Typography>
                </Toolbar>
                <Divider />
                <DrawerContent classes={classes} closeClicked={onClose} />
            </SwipeableDrawer>
            <Fab
                className={classes.fab}
                color='primary'
                onClick={isOpen ? onClose : onOpen} >
                {isOpen && <CloseIcon />}
                {!isOpen && <MenuIcon />}
            </Fab>
        </Hidden>
    </>
);

export default withStyles(styles)(SideMenu);