import React, { Component } from 'react';
import logo from '../logo.svg';
import '../containers/App.css';
import Employees from '../components/Employees/Employees';
import EmployeeTable from '../components/EmployeeTable/EmployeeTable';
import AddEmployee from '../components/AddEmployee/AddEmployee';
import EmployeeModel from '../model/EmployeeModel';
import MultiSelectField from '../components/Multiselect/Multiselect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Pagination from 'material-ui-pagination';
import { get, post, put, remove } from '../functions/server';
import { Route, Switch } from 'react-router-dom';




injectTapEventPlugin();
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employees: [
        // {
        //   'id': '1',
        //   'firstName': 'Maksim',
        //   'lastName': 'Tsikhamirau',
        //   'email': 'maksim.tsikhamirau@helmes.ee',
        //   'groups': ['au', 'gas']
        // },
        // {
        //   'id': '2',
        //   'firstName': 'Daniil',
        //   'lastName': 'Tsikhamirau',
        //   'email': 'daniil.tsikhamirau@helmes.ee',
        //   'groups': ['au', 'core']
        // },
        // {
        //   'id': '3',
        //   'firstName': 'Yuliya',
        //   'lastName': 'Tsikhamirava',
        //   'email': 'yuliya.tsikhamirava@helmes.ee',
        //   'groups': ['apac']
        // }

      ],
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      group: '',
      search: '',
      warning: '',
      action: 'add',

      inputError: {
        email: '',
        firstName: '',
        lastName: ''
      }

    }
  }

  componentDidMount = () => {
    this.updateEmployeesFromServer();
  }

  addEmployeeHandler = () => {
    var found = this.state.employees.find(employee =>
      employee.firstName.toLowerCase().includes(this.state.firstName));
    if (found) {
      this.setState({ warning: 'User with such name already exists' })
    }
    else {
      const { id, firstName, lastName, email } = this.state;
      var newId = this.state.employees.length + 1;
      const newEmployee = new EmployeeModel(newId.toString(), firstName, lastName, email);
      console.log(newEmployee);
      post('employees', null, newEmployee, this.handleServerError);
      this.setState({
        employees: [...this.state.employees,
        { id: newId, firstName: firstName, lastName: lastName, email: email }], id: parseInt(newId) + 1
      });
    }
    this.setState({ firstName: '', lastName: '', email: '', id: '' })
  }

  updateEmployeeHandler = (id) => {
    const { firstName, lastName, email } = this.state;
    var updatedEmployee = this.state.employees.find(employee =>
      employee.id === (this.state.id));
    updatedEmployee.email = this.state.email;
    updatedEmployee.firstName = this.state.firstName;
    updatedEmployee.lastName = this.state.lastName;
    put(`employees/${id}`, null, updatedEmployee, this.handleServerError);
    this.setState({ employees: [...this.state.employees], action: 'add', id: '', firstName: '', lastName: '', email: '' })
  }

  handleServerError = (response) => {
    if (response.status !== 'OK') {
      this.updateEmployeesFromServer();
    }
  }

  updateEmployeesFromServer = () => {
    get('employees', null, (employees) => {
      this.setState({ employees });
    });
  }

  changeEmployeeParamsHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value, warning: '' });
    this.validateInputParams(event.target.name, event.target.value);

  }

  validateInputParams = (name, value) => {
    let isValid = true;
    switch (name) {
      case 'email':
        let errorMessage = (value.includes('@')) ? '' : 'Wrong email'
        this.setState({ inputError: { email: errorMessage } });
        break;
      case 'firstName':

        errorMessage = (/^[a-zA-Z ]+$/.test(value)) ? '' : 'Wrong firstName'
        this.setState({ inputError: { firstName: errorMessage } });
        break;
      case 'lastName':
        errorMessage = (/^[a-zA-Z ]+$/.test(value)) ? '' : 'Wrong lastName'
        this.setState({ inputError: { lastName: errorMessage } });
        break;
    }

  }


  editEmployeeHandler = (id) => {
    const found = this.state.employees.find(e => e.id === id);
    if (found) {
      this.setState({ ...found, action: 'update' });
    }
  }

  removeEmployeeHandler = (id) => {
    const filtered = this.state.employees.filter(e => e.id !== id); `employees/${id}`
    remove(`employees/${id}`, null, this.handleServerError)
    this.setState({ employees: filtered })
  }

  searchEmployeeHandler = (event) => {
    this.setState({ search: event.target.value.toLowerCase() });
  }

  handleMultiSelectChange(value) {
    console.log('You\'ve selected:', value);
    this.setState({ group: value });
  }


  validate() {
    const { email } = this.state;
    // true means invalid, so our conditions got reversed
    return {
      email: email.length === 0
    };
  }

  AddEmployeeComponent = () =>

    <AddEmployee
      addEmployee={this.addEmployeeHandler}
      firstName={this.state.firstName}
      lastName={this.state.lastName}
      email={this.state.email}
      id={this.state.id}
      warning={this.state.warning}
      change={this.changeEmployeeParamsHandler}
      update={this.updateEmployeeHandler}
      action={this.state.action}
      validate={this.state.errors}
      inputError={this.state.inputError}
    />

  EmployeeTableComponent = () => {
    var filteredEmployees = (this.state.search === '') ? this.state.employees :
      this.state.employees.filter(employee =>
        employee.firstName.toLowerCase().includes(this.state.search));
    return <EmployeeTable
      header={[
        {
          name: 'Id',
          props: 'id'
        },
        {
          name: 'First Name',
          props: 'firstName'
        },
        {
          name: 'Last Name',
          props: 'lastName'
        },
        {
          name: 'Email',
          props: 'email'
        },
        {
          name: 'Groups',
          props: 'groups'
        }
      ]}

      list={filteredEmployees}
      edit={this.editEmployeeHandler}
      remove={this.removeEmployeeHandler}
      search={this.searchEmployeeHandler}
    />
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App" >
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Switch>
            <Route exact path="/" component={this.EmployeeTableComponent} />
            <Route exact path="/manage" component={this.AddEmployeeComponent} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;