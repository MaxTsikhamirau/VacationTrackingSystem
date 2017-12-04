import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Employees from './Employees/Employees';
import AddEmployee from './AddEmployee/AddEmployee';


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
    'name': 'xyz',
    'email': '123',
    sortedEmployees: []
  }

  addEmployeeHandler = () => {
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
      this.setState({ ...found })
    }
  }

  removeEmployeeHandler = (id) => {
    const filtered = this.state.employees.filter(e => e.id !== id);
    this.setState({ employees: filtered })
    //this.updatePageData({filtered});
  }

  filterSearchHandler = (event) => {
    var updatedEmployeesList = this.state.employees;
    console.log(updatedEmployeesList);
    var filtered=this.state.employees.filter(employee =>
      employee.name.toLowerCase().includes(event.target.value.toLowerCase()));
    this.setState({ employees: filtered });
    console.log(filtered);
  }



  render() {

    return (
      <div className="App">
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
          id={this.state.employees.id}
        />

        <Employees
          list={this.state.employees}
          edit={this.editEmployeeHandler}
          remove={this.removeEmployeeHandler}
          search={this.filterSearchHandler}
        />
      </div>
    );
  }
}

export default App;
