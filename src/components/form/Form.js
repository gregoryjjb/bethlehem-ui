import React from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import { withStyles, Button, Grid, Divider } from "@material-ui/core";

const styles = theme => ({
    grid: {
        marginTop: 16,
        marginBottom: 16,
    },
});

class Form extends React.Component {
    constructor(props) {
        super(props);

        const fields = this.props.fields;
        const values = {};
        const validationResults = {};

        for (let f of fields) {
            let name = f.name;
            let value = f.defaultValue;
            if(value === undefined || value === null) value = '';
            values[name] = value;
            validationResults[name] = "";
        }

        this.state = {
            fields,
            values,
            validationResults,
        };
    }

    validate = field => {
        if (!field) {
            console.error("Validation called on non-existant field");
            return false;
        }

        const value = this.state.values[field.name];

        let valid = "";
        if (field.required && !value) valid = "Required";
        if (field.validation && value) valid = field.validation(value);

        console.log(field.name, "is", valid === '' ? 'valid' : ('invalid: ' + valid));

        return valid;
    };

    validateOne = name => {
        const field = this.state.fields.find(f => f.name === name);
        if (!field) {
            console.error("Validation called on non-existant field", name);
            return;
        }

        const result = this.validate(field);

        this.setState({
            validationResults: {
                ...this.state.validationResults,
                [name]: result,
            },
        });
    };

    validateAll = () => {
        let validationResults = {};
        let allPass = true;

        for (let field of this.state.fields) {
            let result = this.validate(field);
            validationResults[field.name] = result;
            allPass = allPass && result === "";
        }

        this.setState({
            validationResults,
        });

        return allPass;
    };

    handleFieldChange = e => {
        const target = e.target;
        const name = target.name;
        const value =
            target.type === "checkbox" ? target.checked : target.value;

        console.log({ name, value });

        this.setState(
            {
                values: {
                    ...this.state.values,
                    [name]: value,
                },
            },
            () => {
                if (this.state.validationResults[name] !== "") {
                    this.validateOne(name);
                }
            }
        );
    };

    handleFieldBlur = e => {
        const target = e.target;
        const name = target.name;

        this.validateOne(name);
    };

    handleSubmit = e => {
        e.preventDefault();

        const values = { ...this.state.values };
        const passed = this.validateAll();

        if (passed) this.props.onSubmit(values);
    };

    render() {
        const {
            classes,
            xs,
            sm,
            md,
            lg,
            fields,
            requiredAsterisk,
            submitText,
        } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                {/*<Grid container spacing={16} className={classes.grid}>*/}
                    {fields.map((field, key) => (
                        /*<Grid
                            item
                            xs={xs || 12}
                            sm={sm || 6}
                            md={md || 3}
                            lg={lg || 2}
                            key={field.name + "-grid"}
                        >*/
                        <>
                            <Input
                                field={field}
                                value={this.state.values[field.name]}
                                valid={this.state.validationResults[field.name]}
                                disabled={this.props.disabled}
                                requiredAsterisk={requiredAsterisk}
                                onChange={this.handleFieldChange}
                                onBlur={this.handleFieldBlur}
                                key={field.name}
                            />
                            {key !== fields.length - 1 && <Divider />}
                        </>
                        /*</Grid>*/
                    ))}
                {/*</Grid>*/}
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    disabled={this.props.disabled}
                    onClick={this.handleSubmit}
                >
                    {submitText || 'Submit'}
                </Button>
            </form>
        );
    }
}

Form.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })),
            /*PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                    ]),
                    display: PropTypes.string,
                })
            )*/ defaultValue: PropTypes.oneOfType(
                [PropTypes.string, PropTypes.number, PropTypes.bool]
            ),
            required: PropTypes.bool,
            validation: PropTypes.func,
        })
    ),
    onSubmit: PropTypes.func,
};

Form.defaultProps = {
    fields: [],
    style: { display: "flex", flexDirection: "column" },
};

export default withStyles(styles)(Form);
