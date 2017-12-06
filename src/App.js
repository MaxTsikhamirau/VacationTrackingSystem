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
    name: '',
    email: '',
    search: ''
  }

  addEmployeeHandler = (event) => {
    const { name, email } = this.state;

    // const arr = [1, 2, 3]; // 1, 2, 3
    // const arr2 = [...arr]; // 1, 2, 3
    // const arr3 = arr.concat([4, 5, 6]); // 1, 2, 3, 4, 5, 6
    // const arr4 = [...arr, ...arr2, 4, 5, 6, ...arr]; // 1, 2, 3, 1, 2, 3, 4, 5, 6, 1, 2, 3
    // const arr5 = [arr, 4, 5, 6]; // [1, 2, 3], 4, 5, 6

    // const label = 'Feature';
    // const description = 'Cool Feature';
    // const obj = {
    //   label: 'Feature',
    //   description: 'Cool Feature'
    // };
    // const obj2 = {
    //   label: label,
    //   description: description
    // };
    // const obj = {
    //   label,
    //   descr: description
    // };

    this.setState({ employees: [...this.state.employees, { name: name, email: email }] });

    // var filtered = this.state.employees.filter(employee =>
    //   employee.name.toLowerCase().includes(event.target.value.toLowerCase())); 
    // if (filtered.length !== 0) {
    //   this.setState({ 'warnings': 'User with such name already exists!' })
    // }
    // this.setState((prevState, props)=>{employees: [...prevState.employees, { name, email }]});
  }
  /*??*/
  updateEmployeeHandler = (id) => {
    const { name, email } = this.state;
    this.setState({ employees: [...this.state.employees, { name, email }] });
    // this.setState((prevState, props)=>{employees: [...prevState.employees, { name, email }]});
  }

  changeEmployeeParamsHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
    //this.updatePageData({filtered});
  }
  /*Search works in a proper way but if search started buttons add/remove/edit dont work any more*/
  filterSearchHandler = (event) => {
    this.setState({ search: event.target.value.toLowerCase() });
    console.log(this.state.search);
  }

  render() {
    var filteredEmployees = this.state.employees;
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
          change={this.changeEmployeeParamsHandler}
          edit={this.editEmployeeHandler}
          update={this.updateEmployeeHandler}
          warning={this.warnings}
        />

        <Employees
          list={filteredEmployees}
          edit={this.editEmployeeHandler}
          remove={this.removeEmployeeHandler}
          search={this.filterSearchHandler}

        />
        <EditEmployee />

      </div>
    );
  }
}

export default App;
