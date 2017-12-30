import React from 'react';
import './AddEmployee.css';
import { Link, Route } from 'react-router-dom';
import { PersonAdd, ModeEdit, Cancel, Save, Update } from 'material-ui-icons';
import { TextField, RaisedButton, FlatButton } from 'material-ui'; 



const addEmployee = (props) => {

    if (props.warning) {
        console.error(props.warning);
    }
    console.log(props);
    const isValid = (props.inputError.email || props.inputError.firstName || props.inputError.lastName) ? false : true;
    return (
        <form>
            <div>{props.warning}</div>
            <TextField
                type='text'
                name='firstName'
                value={props.firstName}
                className={props.inputError.firstName ? "error" : "correct"}
                onChange={props.change}
                floatingLabelText="First Name" /><br />
            <TextField
                type='text'
                name='lastName'
                value={props.lastName}
                className={props.inputError.lastName ? "error" : "correct"}
                onChange={props.change}
                floatingLabelText="Last Name" /><br />

            <TextField
                type='text'
                name='email'
                value={props.email}
                className={props.inputError.email ? "error" : "correct"}
                onChange={props.change}
                floatingLabelText="Email" /><br />

            <div><Link to='/'>
                {(props.id) ?
                    <FlatButton primary={true} label='Update' disabled={isValid ? '' : 'disabled'} onClick={props.update.bind(this, props.id)} /> :
                    <FlatButton primary={true} label='Add' disabled={isValid ? '' : 'disabled'} onClick={props.addEmployee} />
                }
                <FlatButton secondary={true} label='Cancel' onClick={props.cancel} />
            </Link>
            </div>
        </form>)

}

export default addEmployee;

/*Redux form?* */

