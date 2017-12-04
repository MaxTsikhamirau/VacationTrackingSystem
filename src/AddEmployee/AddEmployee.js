import React from 'react';

const addEmployee = (props) => {
    return (<div>
        
        <input type='text' name='name' value={props.name} onChange={props.change} placeholder='name' />
        <input type='text' name= 'email' value={props.email} onChange={props.change} placeholder='email' />
        
        <button onClick={props.addEmployee}>Add Employee</button>
       
        </div>)
}

export default addEmployee;

