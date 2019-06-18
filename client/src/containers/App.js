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
import ManageEmployee from '../components/ManageEmployee/ManageEmployee'
import { connect } from 'react-redux';
import E2 from '../components/EmployeeTable/e2'



injectTapEventPlugin();
class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.updateEmployeesFromServer();
  }

  updateEmployeesFromServer = () => {
    get('employees', null, (employees) => {
      this.props.dispatch(fetchEmployeeAction(employees))
      console.log(this.props.store)
    });
    
  }

  E2Component = (props) => {    
    return <E2 {...this.props}
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
            {/* <Route exact path="/" component={this.EmployeeTableComponent} /> */}
            <Route exact path="/" component={E2} />
            <Route exact path="/manage" component={ManageEmployee} />
            <Route exact path="/manage/:id" component={ManageEmployee} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default connect(
  (store) => ({ store }),
  (dispatch) => ({ dispatch }))(App);

