import React from 'react';
import PropTypes from 'prop-types';

import {
    withStyles, List, ListItem, ListItemText,
} from '@material-ui/core';

const styles = theme => ({
    root: {},
})

const SelectableList = ({ classes, items = [], selectedItem = '', onItemClick }) => (
    <List component="nav">
        {items.map((item, key) => (
            <ListItem
                button
                selected={item.value === selectedItem}
                onClick={() => onItemClick && onItemClick(item.value)} >
                <ListItemText primary={item.label} />
            </ListItem>
        ))}
    </List>
);

SelectableList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })),
    selectedIndex: PropTypes.string,
    onItemClick: PropTypes.func,
}

export default withStyles(styles)(SelectableList);