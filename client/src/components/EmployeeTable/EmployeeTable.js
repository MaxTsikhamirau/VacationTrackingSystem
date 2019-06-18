import React from 'react';
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
import { connect } from 'react-redux';
import { fetchEmployeeAction, updateEmployeeAction, removeEmployeeAction, addEmployeeAction } from '../../reducers/EmployeeActions';
import { get, post, put, remove } from '../../functions/server';


class EmployeeTable extends React.Component {

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

  

    render() {
        // const filteredEmployees = (this.state.search === '') ? this.props.store :
        //     this.props.store.filter(employee =>
        //         employee.firstName.toLowerCase().includes(this.state.search) || employee.lastName.toLowerCase().includes(this.state.search));

        const row = this.props.list.map(employee => (

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
                        {/* <ModeEdit name='Edit' onClick={this.props.dispatch(updateEmployeeAction(employee.id))} /> */}
                    </Link>
                    {/* <Delete name='Remove' onClick={this.props.dispatch(removeEmployeeAction(employee.id))} /> */}
                </TableRowColumn>
            </TableRow>
        ));
        return (<div>
            <Link to='/manage'>
                <FlatButton backgroundColor='#1318c8' label='Add' />
            </Link>
            <Table>
                <TableHeader>
                    <TableRow>
                        {this.props.header.map((x, i) =>
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
export default 
// connect(
//     (store) => ({ store }),
//     (dispatch) => ({ dispatch }))
    (EmployeeTable);

