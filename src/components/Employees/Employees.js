import React from 'react';
import './Employees.css';
//import MultiSelectField from '../components/Employees/Multiselect/Multiselect';

const employees = (props) => {

    const employeesList = props.list.map(employee => (
        

        <div className='Employees' key={employee.id}>
            <div>#{employee.id}</div><div>{employee.name}</div>
            <div>{employee.email}</div>
            <div>{employee.groups}</div>
            <div>
                <button name='Edit' classNmame='btn btn-lg btn-success' onClick={props.edit.bind(this, employee.id)}>Edit</button>
                <button name='Remove' classNmame='btn btn-lg btn-success' onClick={props.remove.bind(this, employee.id)}>Remove</button>

            </div>
        </div>
    ));
    return (<div>
        <input type='text' name='search' onChange={props.search} placeholder='search...' />
        <h3>{employeesList}</h3></div>);
}
export default employees;

/*Split an array*/