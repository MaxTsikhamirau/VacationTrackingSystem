import React from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import FlatButton from 'material-ui/FlatButton';
import './AddEmployee.css';


const addEmployee = (props) => {

    if (props.warning) {
        console.error(props.warning);
    }
    console.log(props.inputError);
    const isValid=(props.inputError.email||props.inputError.firstName||props.inputError.lastName)?false:true;
    console.log(isValid);
   
    return (<div>{props.warning}
        <input type='text' name='firstName' value={props.firstName} className={props.inputError.firstName ? "error" : ""} onChange={props.change} placeholder='firstName' />
        <input type='text' name='lastName' value={props.lastName} className={props.inputError.lastName ? "error" : ""} onChange={props.change} placeholder='lastName' />
        <input type='text' name='email'  value={props.email} className={props.inputError.email ? "error" : ""} onChange={props.change} placeholder='email' />    {
            (props.id) ?
                <button name='Update' disabled={isValid?'':'disabled'} onClick={props.update.bind(this, props.id)} >Update Employee</button> :
                <button name='Add' disabled={isValid?'':'disabled'} onClick={props.addEmployee}>Add Employee</button>
        }
    </div>)

}

export default addEmployee;

