import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Pagination from 'material-ui-pagination';
import { Link, Route } from 'react-router-dom';
import { Delete, ModeEdit, PersonAdd } from 'material-ui-icons';
import { fetchEmployeeAction, updateEmployeeAction, removeEmployeeAction } from '../../reducers/EmployeeActions';
import { get, remove } from '../../functions/server';


class e2 extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        server: ''
    }

    componentDidMount = () => {
        this.updateEmployeesFromServer();
    }

    updateEmployeesFromServer = () => {
        get('employees', null, (employees) => {
            this.props.dispatch(fetchEmployeeAction(employees))
        });
        console.log(this.props.store)
    }

    searchEmployeeHandler = (event) => {
        this.setState({ search: event.target.value.toLowerCase() });
    }

    removeEmployeeHandler = (id) => {
        this.props.dispatch(removeEmployeeAction(id));
        remove(`employees/${id}`, null, this.handleServerError)
    }

    render() {
        const filteredEmployees = (this.state.search === '') ? this.props.employees :
            this.props.employees.filter(employee =>
                employee.firstName.toLowerCase().includes(this.state.search) || employee.lastName.toLowerCase().includes(this.state.search));
                console.log(this.props.employees)
        const row = this.props.employees.map(employee => (

            <TableRow key={employee.id}>
                <TableRowColumn>
                    {employee.id}
                </TableRowColumn>
                <TableRowColumn>
                    {employee.firstName}
                </TableRowColumn>
                <TableRowColumn>
                    {employee.lastName}
                </TableRowColumn>
                <TableRowColumn>
                    {employee.email}
                </TableRowColumn>
                <TableRowColumn>
                    {employee.groups}
                </TableRowColumn>
                <TableRowColumn>
                    <Link to={`manage/${employee.id}`}>
                        {/* <ModeEdit name='Edit' onClick={this.updateEmployeeHandler.bind(this, employee.id)} /> */}
                    </Link>
                    {/* <Delete name='Remove' onClick={() => this.removeEmployeeHandler(employee.id)} /> */}
                </TableRowColumn>
            </TableRow>
        ))

        const header = [
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
        ];
        return (<div>
            <Link to='/manage'>
                <FlatButton backgroundColor='#1318c8' label='Add' />
            </Link>
            <Table>
                <TableHeader>
                    <TableRow>
                        {header.map((x, i) =>
                            <TableHeaderColumn key={i}>
                                {x.name}
                            </TableHeaderColumn>)}
                    </TableRow>
                </TableHeader>
                <TableBody
                    stripedRows
                    showRowHover>
                    {row}
                </TableBody>
            </Table>

        </div>)
    }
}
export default connect(

    store => ({
        employees: store.employees
    }),
    dispatch => ({ dispatch })
)(e2)