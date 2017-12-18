import React from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withFormsy } from 'formsy-react';

const addEmployee = (props) => {
    if (props.warning) {
        console.error(props.warning);
    }

    return(<div>{props.warning}


        <input type='text' name='firstName' value={props.firstName} onChange={props.change} placeholder='firstName' />
        <input type='text' name='lastName' value={props.lastName} onChange={props.change} placeholder='lastName' />
        <input type='text' name='email' value={props.email} onChange={props.change} placeholder='email' />    {
            (props.id) ?
                <button name='Update' onClick={props.update.bind(this, props.id)} >Update Employee</button> :
                <button name='Add' onClick={props.addEmployee}>Add Employee</button>
        }
    </div>)

}

export default addEmployee;

