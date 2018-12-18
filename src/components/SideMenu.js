import React from 'react';

import {
    withStyles, List, ListItem, ListItemText, Hidden, Drawer, SwipeableDrawer, Fab, Toolbar, Typography, Divider,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

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

const DrawerContent = ({ closeClicked, classes }) => (
    <div className={classes.drawerContent}>
        <List>
            <ListItem>
                <ListItemText primary="Placeholder" />
            </ListItem>
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