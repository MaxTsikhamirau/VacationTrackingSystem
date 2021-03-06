import React from 'react';
// import EditEmployee from 'src/EditEmployee/EditEmployee';

const addEmployee = (props) => {
    if (props.warning) {
        console.error(props.warning);
    }
    return (<div>
        <div>{props.warning}</div>
        <input type='text' name='name' value={props.name} onChange={props.change} placeholder='name' />
        <input type='text' name='email' value={props.email} onChange={props.change} placeholder='email' />
        <button onClick={props.addEmployee}>Add Employee</button>       
        <button name='Update' onClick={props.update.bind(this, props.id)} >Update Employee</button>
    </div>)
}

export default addEmployee;

