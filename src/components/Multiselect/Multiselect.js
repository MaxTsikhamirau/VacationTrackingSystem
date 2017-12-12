import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './Multiselect.css';

const GROUPS = [
    { label: 'GAS', value: 'gas' },
    { label: 'AU', value: 'au' },
    { label: 'Core', value: 'core' },
    { label: 'APAC', value: 'apac' },
   
];


var MultiSelectField = createClass({
    displayName: 'MultiSelectField',
    propTypes: {
        label: PropTypes.string,

    },

    getInitialState() {
        return {
            value: []
        };
    },

    handleSelectChange(value) {
        console.log('You\'ve selected:', value);
        this.setState({ value });
    },

    render() {
        const { value } = this.state;
        console.log(value);
        const options = GROUPS;
        return (
            <div className="section">
                <Select
                    multi
                    onChange={this.handleSelectChange}
                    options={options}
                    placeholder="Select your project(s)"                   
                    value={value}
                />
            </div>
        );
    }
});
export default MultiSelectField;
