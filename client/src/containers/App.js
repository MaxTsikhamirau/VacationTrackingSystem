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
import { fetchEmployeeAction, updateEmployeeAction, removeEmployeeAction, addEmployeeAction } from '../reducers/EmployeeActions'



injectTapEventPlugin();
class App extends Component {

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
      search: '',
      warning: '',
      action: 'add',
      inputEmailError: '',
      inputFirstNameError: '',
      inputLastNameError: ''


    }
  }

  componentDidMount = () => {
    this.unsubscribe = this.props.store.subscribe(() => { this.forceUpdate() });
    this.updateEmployeesFromServer();
  }

  componentWillUnmount = () => {
    this.unsubscribe()
  }

  clean = () => {

  }

  ifExist = () => {
    return this.props.store.getState().find(employee =>
      employee.firstName.toLowerCase().includes(this.state.firstName));
  }

  addEmployeeHandler = () => {
    if (!this.ifExist()) {
      const { firstName, lastName, email } = this.state;
      const newEmployee = new EmployeeModel(this.getUniqueId().toString(), firstName, lastName, email);
      this.props.store.dispatch(addEmployeeAction(newEmployee))
      post('employees', null, newEmployee, this.handleServerError);
    }
    else {
      this.setState({ warning: 'User with such name already exists' })
    }
    this.setState({ firstName: '', lastName: '', email: '' });
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

  cancelHandler = () => {
    this.setState({ firstName: '', lastName: '', email: '', warning: '', inputError: { firstName: '', lastName: '', email: '' } })
  }

  updateEmployeeHandler = (id) => {
    const { firstName, lastName, email } = this.state;
    const updatedEmployee = new EmployeeModel(id, firstName, lastName, email);
    put(`employees/${id}`, null, updatedEmployee, this.handleServerError);
    this.props.store.dispatch(updateEmployeeAction(updatedEmployee))
    this.setState({ action: 'add', id: '', firstName: '', lastName: '', email: '' })
  }

  handleServerError = (response) => {
    if (response.status !== 'OK') {
      this.updateEmployeesFromServer();
    }
  }

  updateEmployeesFromServer = () => {
    get('employees', null, (employees) => {
      this.props.store.dispatch(fetchEmployeeAction(employees))
      this.setState({ firstNewId: employees.length + 1 });
    });
    console.log(this.props.store.getState())
  }

  changeEmployeeParamsHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value, warning: '' });
    this.validateInputParams(event.target.name, event.target.value);

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

  editEmployeeHandler = (id) => {
    const found = this.props.store.getState().find(e => e.id === id);
    console.log(found)
    if (found) {
      this.setState({ ...found, action: 'update' });
    }
  }

  removeEmployeeHandler = (id) => {
    this.props.store.dispatch(removeEmployeeAction(id));
    remove(`employees/${id}`, null, this.handleServerError)
  }

  searchEmployeeHandler = (event) => {
    this.setState({ search: event.target.value.toLowerCase() });
  }

  handleMultiSelectChange(value) {
    console.log('You\'ve selected:', value);
    this.setState({ group: value });
  }
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
    var filteredEmployees = (this.state.search === '') ? this.props.store.getState() :
      this.props.store.getState().filter(employee =>
        employee.firstName.toLowerCase().includes(this.state.search) || employee.lastName.toLowerCase().includes(this.state.search));
    console.log(filteredEmployees)
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

