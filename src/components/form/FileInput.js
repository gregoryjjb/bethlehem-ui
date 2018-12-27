import React from 'react';

import {
    withStyles, FormControl, InputLabel, Button, Typography, FormHelperText,
} from '@material-ui/core';

const styles = theme => ({
    root: {},
    label: {
        position: 'static',
        top: 0,
        left: 0,
        transform: 'none',
        paddingBottom: 8,
    },
    input: {
        display: 'none',
    },
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 8,
    }
})

const FileInput = ({
    classes,
    className,
    name,
    id,
    label,
    accept='*',
    value,
    onChange,
    error,
}) => {
    
    if(!id) id = name + Math.floor(Math.random() * 99999);
    let hasError = !!error;
    
    return(
        <FormControl className={className} error={hasError}>
            {label && (
                <InputLabel className={classes.label} >
                    {label}
                </InputLabel>
            )}
            <input
                name={name}
                className={classes.input}
                type='file'
                id={id}
                accept={accept}
                onChange={onChange}>
            </input>
            <div className={classes.horizontal}>
                <label htmlFor={id}>
                    <Button
                        variant='outlined'
                        component='span'>
                        Select
                    </Button>
                </label>
                {value && value.name ? (
                    <Typography className={classes.text} variant='body1'>{value.name}</Typography>
                ) : (
                    <Typography className={classes.text} color='textSecondary' variant='body1'>None selected</Typography>
                )}
            </div>
            {hasError && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default withStyles(styles)(FileInput);