import React from 'react';
import PropTypes from 'prop-types';

import {
    withStyles, List, ListItem, ListItemText, ListItemIcon,
} from '@material-ui/core';

const styles = theme => ({
    root: {},
    text: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
})

const ClickableList = ({ classes, items = [], onItemClick, icon }) => (
    <List component="nav">
        {items.map((item, key) => (
            <ListItem
                button
                key={item.value}
                onClick={() => onItemClick(item.value)} >
                {item.icon && <ListItemIcon>
                    {item.icon}
                </ListItemIcon>}
                <ListItemText primary={item.label} classes={{ primary: classes.text }} />
            </ListItem>
        ))}
    </List>
);

ClickableList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.any,
    })),
    onItemClick: PropTypes.func,
}

export default withStyles(styles)(ClickableList);