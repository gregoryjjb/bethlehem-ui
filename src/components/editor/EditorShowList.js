import React from 'react';

import {
    withStyles, Card, CardContent, Typography, Button,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import Store from '../../utils/store';
import { openCreateShowDialog, openEditShowDialog, fetchShows } from '../../utils/actions';
import SelectableList from '../form/SelectableList';
import api from '../../utils/api';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
    },
    header: {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'space-between',
    },
    title: {
        flex: 1,
    },
    button: {
        marginLeft: 16,
        height: 40,
    },
    red: {
        background: theme.palette.error.light,
    },
    listArea: {
        flex: 1,
        overflow: 'auto',
    }
})

class EditorShowList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedShow: ''
        }
    }
    
    findSelectedShow = () => {
        const shows = this.props.store.get('shows');
        return shows.find(s => s.name === this.state.selectedShow) || null;
    }
    
    handleItemClick = i => {
        this.setState({ selectedShow: i });
    }
    
    handleOpenClick = e => {
        const show = this.findSelectedShow();
        this.props.store.set('editor.show')(show);
    }
    
    handleEditClick = e => {
        const show = this.findSelectedShow();
        openEditShowDialog(show);
    }
    
    handleNewClick = e => {
        openCreateShowDialog();
    }
    
    handleDeleteClick = e => {
        const n = this.state.selectedShow;
        if(n) {
            this.setState({ selectedShow: '' });
            api.deleteShow(n)
                .then(() => {
                    fetchShows()
                })
        }
    }
    
    render() {
        const { store, classes } = this.props;
        
        const shows = store.get('shows');
        
        return(
            <Card className={classes.root}>
                <CardContent className={classes.header} >
                    <Typography variant='h6' className={classes.title} >Projects</Typography>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        disabled={this.state.selectedShow === ''}
                        onClick={this.handleOpenClick} >
                        Open
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        disabled={this.state.selectedShow === ''}
                        onClick={this.handleEditClick} >
                        Edit
                    </Button>
                    <Button
                        variant='contained'
                        className={classes.button + ' ' + classes.red}
                        disabled={this.state.selectedShow === ''}
                        onClick={this.handleDeleteClick} >
                        Delete
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        className={classes.button}
                        onClick={this.handleNewClick} >
                        <AddIcon />
                        Create
                    </Button>
                </CardContent>
                <div className={classes.listArea}>
                    <SelectableList
                        selectedItem={this.state.selectedShow}
                        onItemClick={this.handleItemClick}
                        items={shows.map(s => ({ value: s.name, label: s.displayName }))} />
                </div>
            </Card>
        )    
    }
}

export default Store.withStore(withStyles(styles)(EditorShowList));