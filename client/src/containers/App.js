import React, { Component } from 'react';
import logo from '../assets/logo.svg';
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
import { Route, Link, Switch } from 'react-router-dom';
import ActionBar from '../components/ActionBar/ActionBar';



injectTapEventPlugin();
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      firstNewId: '',
      lastCreatedId: '',
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      group: '',
      search: '',
      warning: '',
      action: 'add',
      inputEmailError: '',
      inputFirstNameError: '',
      inputLastNameError: ''


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
      const { id, firstName, lastName, email, firstNewId } = this.state;
      const lastCreatedId = this.state.lastCreatedId;
      console.log("id:" + id + " firstNewId:" + firstNewId + " lastCreatedId:" + lastCreatedId);
      let newEmployee = new EmployeeModel();
      if (lastCreatedId === '') {
        newEmployee = new EmployeeModel(firstNewId.toString(), firstName, lastName, email);
        this.setState({
          employees: [...this.state.employees,
          { id: firstNewId, firstName: firstName, lastName: lastName, email: email }], lastCreatedId: firstNewId
        });
      } else {
        newEmployee = new EmployeeModel((parseInt(lastCreatedId) + 1).toString(), firstName, lastName, email);
        this.setState({
          employees: [...this.state.employees,
          { id: parseInt(lastCreatedId) + 1, firstName: firstName, lastName: lastName, email: email }], lastCreatedId: (parseInt(lastCreatedId) + 1)
        });

      }
      post('employees', null, newEmployee, this.handleServerError);
    }
    this.setState({ firstName: '', lastName: '', email: '' });
  }

  cancelHandler = () => {
    this.setState({ firstName: '', lastName: '', email: '', warning: '', inputError: { firstName: '', lastName: '', email: '' } })
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
      this.setState({ employees, firstNewId: employees.length + 1 });
    });
  }

  changeEmployeeParamsHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value, warning: '' });
    this.validateInputParams(event.target.name, event.target.value);

  }
  /*How to save previous state of other fields?*/
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

  /*to get user from server it should be fetched in life-cycle method ..DidMount() if component is a function should it be implemented as a class(to have state and so on...)?*/

  // fetchEmployee=(id)=>{

  // }

  obj = {
    param: '',
    param2: {},
    param3: [],
    func: () => { }
  }

  func = () => { }

  AddEmployeeComponent = (props) =>

    <AddEmployee {...this.props}
      addEmployee={this.addEmployeeHandler}
      firstName={this.state.firstName}
      lastName={this.state.lastName}
      email={this.state.email}
      id={this.state.id}
      warning={this.state.warning}
      change={this.changeEmployeeParamsHandler}
      update={this.updateEmployeeHandler}
      action={this.state.action}
      inputEmailError={this.state.inputEmailError}
      inputFirstNameError={this.state.inputFirstNameError}
      inputLastNameError={this.state.inputLastNameError}
      cancel={this.cancelHandler}
    />

  EmployeeTableComponent = (props) => {
    var filteredEmployees = (this.state.search === '') ? this.state.employees :
      this.state.employees.filter(employee =>
        employee.firstName.toLowerCase().includes(this.state.search));
    return <EmployeeTable {...this.props}
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
          </header>
          <ActionBar
            search={this.searchEmployeeHandler} />
          <Switch>
            <Route exact path="/" component={this.EmployeeTableComponent} />
            <Route exact path="/manage" component={this.AddEmployeeComponent} />
            <Route exact path="/manage/:id" component={this.AddEmployeeComponent} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;

