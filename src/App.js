import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Employees from './Employees/Employees';
import AddEmployee from './AddEmployee/AddEmployee';
import EditEmployee from './EditEmployee/EditEmployee';


class App extends Component {

  state = {
    employees: [
      {
        'id': '1',
        'name': 'Maksim Tsikhamirau',
        'email': 'maksim.tsikhamirau@helmes.ee'
      },
      {
        'id': '2',
        'name': 'Daniil Tsikhamirau',
        'email': 'daniil.tsikhamirau@helmes.ee'
      },
      {
        'id': '3',
        'name': 'Yuliya Tsikhamirava',
        'email': 'yuliya.tsikhamirava@helmes.ee'
      }
    ],
    id: '',
    name: '',
    email: '',
    search: '',
    warning: ''
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
    this.setState({name:'', email:''})
  }

  updateEmployeeHandler = (id) => {
    const { name, email } = this.state;
    var updatedEmployee = this.state.employees.find(employee =>
      employee.id.includes(this.state.id));
    console.log(updatedEmployee);
    updatedEmployee.email = this.state.email;
    updatedEmployee.name = this.state.name;
    this.setState({ employees: [...this.state.employees] })    
  }

  changeEmployeeParamsHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value , warning:''});
  }

  editEmployeeHandler = (id) => {
    const found = this.state.employees.find(e => e.id === id);
    if (found) {
      this.setState({ ...found });
    }
  }

  removeEmployeeHandler = (id) => {
    const filtered = this.state.employees.filter(e => e.id !== id);
    this.setState({ employees: filtered })   
  }

  searchEmployeeHandler = (event) => {
    this.setState({ search: event.target.value.toLowerCase() });
    console.log(this.state.search);
  }

  render() {
    var filteredEmployees = (this.state.search === '') ? this.state.employees :
      this.state.employees.filter(employee =>
        employee.name.toLowerCase().includes(this.state.search));

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
          warning={this.state.warning}
          change={this.changeEmployeeParamsHandler}
          update={this.updateEmployeeHandler}
        />

        <Employees
          list={filteredEmployees}
          edit={this.editEmployeeHandler}
          remove={this.removeEmployeeHandler}
          search={this.searchEmployeeHandler}
        />
        <EditEmployee />

      </div>
    );
  }
}

export default App;
