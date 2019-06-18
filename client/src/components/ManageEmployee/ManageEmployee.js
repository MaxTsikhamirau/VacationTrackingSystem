import React, { Component } from 'react';
import { fetchEmployeeAction, updateEmployeeAction, removeEmployeeAction, addEmployeeAction } from '../../reducers/EmployeeActions';

import { get, post, put, remove } from '../../functions/server';
import EmployeeModel from '../../model/EmployeeModel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { PersonAdd, ModeEdit, Cancel, Save, Update } from 'material-ui-icons';
import { TextField, RaisedButton, FlatButton } from 'material-ui';

class ManageEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNewId: '',
            lastCreatedId: '',
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            group: '',
            warning: '',
            action: 'add',
            inputEmailError: '',
            inputFirstNameError: '',
            inputLastNameError: ''

        }
    }


    componentDidMount = () => {
        get('employees', null, (employees) => {
            this.props.dispatch(fetchEmployeeAction(employees))
            this.setState({ firstNewId: employees.length + 1 });
        });
    }

    handleServerError = (response) => {
        if (response.status !== 'OK') {
            this.updateEmployeesFromServer();
        }
    }


    addEmployeeHandler = () => {
        if (!this.ifExist()) {
            const { firstName, lastName, email } = this.state;
            const newEmployee = new EmployeeModel(this.getUniqueId().toString(), firstName, lastName, email);
            this.props.dispatch(addEmployeeAction(newEmployee))
            post('employees', null, newEmployee, this.handleServerError);
        }
        else {
            this.setState({ warning: 'User with such name already exists' })
        }
        this.setState({ firstName: '', lastName: '', email: '' });
    }

    ifExist = () => {
        return this.props.store.employees.find(employee =>
            employee.firstName.toLowerCase().includes(this.state.firstName));
    }

    getUniqueId = () => {
        const { firstNewId, lastCreatedId } = this.state;
        console.log(" firstNewId:" + firstNewId + " lastCreatedId:" + lastCreatedId);
        if (lastCreatedId === '') {
            this.setState({ lastCreatedId: firstNewId });
            return firstNewId;
        } else {
            this.setState({ lastCreatedId: (parseInt(lastCreatedId) + 1) });
            return parseInt(lastCreatedId) + 1;
        }
    }

    updateEmployeeHandler = (id) => {
        const { firstName, lastName, email } = this.state;
        const updatedEmployee = new EmployeeModel(id, firstName, lastName, email);
        put(`employees/${id}`, null, updatedEmployee, this.handleServerError);
        this.props.dispatch(updateEmployeeAction(updatedEmployee))
        this.setState({ action: 'add', id: '', firstName: '', lastName: '', email: '' })
    }

    changeEmployeeParamsHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value, warning: '' });
        this.validateInputParams(event.target.name, event.target.value);

    }

    editEmployeeHandler = (id) => {
        const found = this.props.store.employees.find(e => e.id === id);
        console.log(found)
        if (found) {
            this.setState({ ...found, action: 'update' });
        }
    }

    removeEmployeeHandler = (id) => {
        this.props.dispatch(removeEmployeeAction(id));
        remove(`employees/${id}`, null, this.handleServerError)
    }

    validateInputParams = (name, value) => {
        switch (name) {
            case 'email':
                let errorMessage = (value.includes('@')) ? '' : 'Wrong email'
                this.setState({ inputEmailError: errorMessage })
                console.log(errorMessage);
                break;
            case 'firstName':
                console.log(name, value);
                errorMessage = (/^[a-zA-Z ]+$/.test(value)) ? '' : 'Wrong firstName'
                this.setState({ inputFirstNameError: errorMessage });
                console.log(errorMessage);
                break;
            case 'lastName':
                errorMessage = (/^[a-zA-Z ]+$/.test(value)) ? '' : 'Wrong lastName'
                this.setState({ inputLastNameError: errorMessage });
                console.log(errorMessage);
                break;
        }
    }

    cancelHandler = () => {
        this.setState({ firstName: '', lastName: '', email: '', warning: '', inputError: { firstName: '', lastName: '', email: '' } })
    }




    render() {
        const isValid = (this.state.inputEmailError || this.state.inputFirstNameError || this.state.inputLastNameError) ? false : true;
        return (
            <form>
                <div>{this.state.warning}</div>
                <TextField
                    type='text'
                    name='firstName'
                    value={this.state.firstName}
                    className={this.state.inputFirstNameError ? "error" : "correct"}
                    onChange={this.changeEmployeeParamsHandler}
                    floatingLabelText="First Name" /><br />
                <TextField
                    type='text'
                    name='lastName'
                    value={this.state.lastName}
                    className={this.state.inputLastNameError ? "error" : "correct"}
                    onChange={this.changeEmployeeParamsHandler}
                    floatingLabelText="Last Name" /><br />

                <TextField
                    type='text'
                    name='email'
                    value={this.state.email}
                    className={this.state.inputEmailError ? "error" : "correct"}
                    onChange={this.changeEmployeeParamsHandler}
                    floatingLabelText="Email" /><br />

                <div><Link to='/'>
                    {(this.state.id) ?
                        <FlatButton primary={true} label='Update' disabled={isValid ? '' : 'disabled'} onClick={this.updateEmployeeHandler.bind(this, this.state.id)} /> :
                        <FlatButton primary={true} label='Add' disabled={isValid ? '' : 'disabled'} onClick={this.addEmployeeHandler} />
                    }
                    <FlatButton secondary={true} label='Cancel' onClick={this.cancelHandler} />
                </Link>
                </div>
            </form>)

    }



}

export default
    connect(
        (store) => ({ store }),
        (dispatch) => ({ dispatch })

    )(ManageEmployee);