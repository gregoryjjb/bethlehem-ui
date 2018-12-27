import React from "react";
import {
    withStyles,
    TextField,
    InputAdornment,
    Typography,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import OutlinedSelect from "./Select";
import FileInput from "./FileInput";

const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 350,
        //marginBottom: 24,
    },
    wrapper: {
        margin: '24px 0',
        //marginBottom: 24,
    },
    helperText: {
        marginBottom: 16,
    }
});

const Input = ({ classes, field, value, valid, onChange, onBlur, requiredAsterisk }) => {
    let input;

    let label = field.label + (field.required && requiredAsterisk ? "*" : "");

    let endAdornment = !field.units ? null : (
        <InputAdornment position="end">{field.units}</InputAdornment>
    );

    if (field.type === "select") {
        input = (
            <OutlinedSelect
                className={classes.root}
                name={field.name}
                label={label}
                options={field.options}
                value={value}
                valid={valid}
                onChange={onChange}
                onBlur={onBlur}
            />
        );
    }
    
    else if(field.type === 'checkbox') {
		input = (
			<FormControlLabel
				className={classes.root}
				label={field.label}
				control={
					<Checkbox
						name={field.name}
						checked={value}
						onChange={onChange}
						disabled={field.disabled}
					/>
				}
			/>
		)
    }
    
    else if(field.type === 'file') {
        input = (
            <FileInput
                name={field.name}
                label={field.label}
                value={value}
                accept={field.accept || '*'}
                error={valid}
                className={classes.root}
                onChange={onChange} />
        )
    }
    
    else {
        input = (
            <TextField
                className={classes.root}
                label={label}
                error={valid !== ""}
                helperText={valid}
                name={field.name}
                type={field.type}
                variant="outlined"
                value={value}
                onChange={e => {
                    onChange(e);
                }}
                onBlur={onBlur}
                InputProps={{
                    endAdornment,
                    inputComponent: field.component,
                }}
            />
        );
    }

    return (
        <div className={classes.wrapper} >
            {field.helperText &&
                <Typography style={{
                    marginBottom: field.type === 'checkbox' ? 4 : 16,
                }} variant='body2'>{field.helperText}</Typography>
            }
            {input}
        </div>
    );
};

export default withStyles(styles)(Input);
