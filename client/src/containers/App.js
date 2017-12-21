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

injectTapEventPlugin();
class App extends Component {

  constructor(props) {
    super(props);
    this.setTotal = this.setTotal.bind(this);
    this.setDisplay = this.setDisplay.bind(this);

    this.state = {
      employees: [
        {
          'id': '1',
          'firstName': 'Maksim',
          'lastName': 'Tsikhamirau',
          'email': 'maksim.tsikhamirau@helmes.ee',
          'groups': ['au', 'gas']
        },
        {
          'id': '2',
          'firstName': 'Daniil',
          'lastName': 'Tsikhamirau',
          'email': 'daniil.tsikhamirau@helmes.ee',
          'groups': ['au', 'core']
        },
        {
          'id': '3',
          'firstName': 'Yuliya',
          'lastName': 'Tsikhamirava',
          'email': 'yuliya.tsikhamirava@helmes.ee',
          'groups': ['apac']
        }

      ],
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      group: '',
      search: '',
      warning: '',
      action: 'add',
      pagination: {
        total: 2,
        display: 2,
        number: 1,
      },
      errors: {
        name: false,
        email: true,
      }
    }
  }
  setTotal(event, total) {
    // eslint-disable-next-line no-param-reassign
    total = total.trim();
    if (total.match(/^\d*$/)) {
      if (total !== '') {
        // eslint-disable-next-line no-param-reassign
        total = parseInt(total, 10);
      } else {
        // eslint-disable-next-line no-param-reassign
        total = 0;
      }

      this.setState({ total });
    }
  }
  setDisplay(event, display) {
    // eslint-disable-next-line no-param-reassign
    display = display.trim();
    if (display.match(/^\d*$/)) {
      if (display !== '') {
        // eslint-disable-next-line no-param-reassign
        display = parseInt(display, 10);
      } else {
        // eslint-disable-next-line no-param-reassign
        display = 0;
      }

      this.setState({ display });
    }
  }

  addEmployeeHandler = (event) => {
    var found = this.state.employees.find(employee =>
      employee.firstName.toLowerCase().includes(this.state.firstName));
    if (found) {
      this.setState({ warning: 'User with such name already exists' })
    }
    else {
      const { id, firstName, lastName, email } = this.state;
      var newId = this.state.employees.length + 1;
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

    this.setState({ employees: [...this.state.employees], action: 'add', id: '', firstName: '', lastName: '', email: '' })
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

 
  validate() {
    const{email}=this.state;
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

  PaginationComponent = () =>
    <Pagination
      total={this.state.pagination.total}
      current={this.state.pagination.number}
      display={this.state.pagination.display}
      onChange={number => this.setState({ number })}
    />

  render() {
    return (
      <MuiThemeProvider>
        <div className="App" >
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <this.AddEmployeeComponent />
          <this.EmployeeTableComponent />
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;