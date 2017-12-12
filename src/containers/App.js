import React, { Component } from 'react';
import logo from '../logo.svg';
import '../containers/App.css';
import Employees from '../components/Employees/Employees';
import AddEmployee from '../components/AddEmployee/AddEmployee';
import EmployeeModel from '../model/EmployeeModel';
import MultiSelectField from '../components/Multiselect/Multiselect';

class App extends Component {

  state = {
    employees: [
      {
        'id': '1',
        'name': 'Maksim Tsikhamirau',
        'email': 'maksim.tsikhamirau@helmes.ee',
        'groups': ['au', 'gas']
      },
      {
        'id': '2',
        'name': 'Daniil Tsikhamirau',
        'email': 'daniil.tsikhamirau@helmes.ee',
        'groups': ['au', 'core']
      },
      {
        'id': '3',
        'name': 'Yuliya Tsikhamirava',
        'email': 'yuliya.tsikhamirava@helmes.ee',
        'groups': ['apac']
      }
    ],
    id: '',
    name: '',
    email: '',
    group: '',
    search: '',
    warning: '',
    action: 'add'
  }

  addEmployeeHandler = (event) => {
    var found = this.state.employees.find(employee =>
      employee.name.toLowerCase().includes(this.state.name));
    if (found) {
      this.setState({ warning: 'User with such name already exists' })
    }
    else {
      const { id, name, email } = this.state;
      var newId = this.state.employees.length + 1;
      this.setState({ employees: [...this.state.employees, { id: newId, name: name, email: email }], id: parseInt(newId) + 1 });
    }
    this.setState({ name: '', email: '' })
  }

  updateEmployeeHandler = (id) => {
    const { name, email } = this.state;
    var updatedEmployee = this.state.employees.find(employee =>
      employee.id.includes(this.state.id));
    updatedEmployee.email = this.state.email;
    updatedEmployee.name = this.state.name;
    this.setState({ employees: [...this.state.employees], action: 'add' })
  }

  changeEmployeeParamsHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value, warning: '' });
  }

  editEmployeeHandler = (id) => {
    const found = this.state.employees.find(e => e.id === id);
    if (found) {
      this.setState({ ...found, action: 'update' });
    }
  }

  removeEmployeeHandler = (id) => {
    const filtered = this.state.employees.filter(e => e.id !== id);
    this.setState({ employees: filtered })
  }

  searchEmployeeHandler = (event) => {
    this.setState({ search: event.target.value.toLowerCase() });
  }

  handleMultiSelectChange(value) {
    console.log('You\'ve selected:', value);
    this.setState({ group: value });
  }

  render() {
    var filteredEmployees = (this.state.search === '') ? this.state.employees :
      this.state.employees.filter(employee =>
        employee.name.toLowerCase().includes(this.state.search));
    const groupsSplit = this.state.groups;

    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <AddEmployee
          addEmployee={this.addEmployeeHandler}
          name={this.state.name}
          email={this.state.email}
          id={this.state.id}
          groups={groupsSplit}
          warning={this.state.warning}
          change={this.changeEmployeeParamsHandler}
          update={this.updateEmployeeHandler}
          action={this.state.action}
        />
        <MultiSelectField
          // selectedgroup={this.state.group}
          // onSelect={this.handleMultiSelectChange}

        />

        <Employees
          list={filteredEmployees}
          edit={this.editEmployeeHandler}
          remove={this.removeEmployeeHandler}
          search={this.searchEmployeeHandler}
        />


      </div>
    );
  }
}

export default App;
