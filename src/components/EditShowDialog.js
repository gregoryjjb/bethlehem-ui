import React from 'react';
import Form from './form/Form';

import {
    withStyles, Dialog, DialogTitle, DialogContent,
} from '@material-ui/core';

const styles = theme => ({
    root: {},
})

const EditShowDialog = ({ classes, open, show, fetching, onCancel, onSubmit }) => (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth='xs' >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
            {show &&
                <Form
                    fields={[{
                        name: 'displayName',
                        label: 'Name',
                        type: 'text',
                        required: true,
                        defaultValue: show.displayName,
                    }, {
                        name: 'playInAll',
                        label: 'Include in "Play All" rotation',
                        type: 'checkbox',
                        defaultValue: show.playInAll,
                    }]}
                    fetching={fetching}
                    onSubmit={onSubmit}
                />}
        </DialogContent>
    </Dialog>
);

export default withStyles(styles)(EditShowDialog);