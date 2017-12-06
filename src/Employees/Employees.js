import React from 'react';
import './Employees.css'

const employees = (props) => {    

    const employeesList = props.list.map(employee => (

        <div className='Employees' key={employee.id}>
            <div>#{employee.id}</div><div>{employee.name}</div>
            <div>{employee.email}</div>
            <div>
                <button name='Edit' onClick={props.edit.bind(this, employee.id)}>Edit</button>
                <button name='Remove' onClick={props.remove.bind(this, employee.id)}>Remove</button>
            </div>
        </div>
    ));
    return (<div>
        <input type='text' name='search' onChange={props.search} placeholder='search...' /> 
        <h3>{employeesList}</h3></div>);
}
export default employees;


/*Questions:

1)Should I bind eventListeners to the fields Im searching for? 
if search for name it should be like .bind(this, employee.name)? 

2) when alert that user already exists its a kind of search anyway? (seraching by name, if found=>alert)?

3)some explanations on syntax filter(e => e.id !== id)

4)props.search.bind(this, props.employees.name) where can I get the user? what is the approach?



*/