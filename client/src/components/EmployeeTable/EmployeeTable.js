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



const employeeTable = (props) => {
    console.log(props);

    const row = props.list.map(employee => (

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
                    <ModeEdit name='Edit' onClick={props.edit.bind(this, employee.id)} />

                </Link>
                <Delete name='Remove' onClick={props.remove.bind(this, employee.id)} />

            </TableRowColumn>
        </TableRow>
    ));
    return (<div>
        <Link to='/manage'>
            <PersonAdd />
        </Link>
        <Table>
            <TableHeader>
                <TableRow>
                    {props.header.map((x, i) =>
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
export default employeeTable;

