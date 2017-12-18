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


const employeeTable = (props) => {    
   
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
                {/* <FlatButton
                    backgroundColor="#a4c639"
                    hoverColor="#8AA62F"
                    style={style}
                /> */}
                <button name='Edit' classNmame='btn btn-lg btn-success' onClick={props.edit.bind(this, employee.id)}>Edit</button>
                <button name='Remove' classNmame='btn btn-lg btn-success' onClick={props.remove.bind(this, employee.id)}>Remove</button>
            </TableRowColumn>
        </TableRow>
    ));
    return (<div>
        <Table
            striped
        >
            <TableHeader>
                <TableRow>
                    {props.header.map((x, i) =>
                        <TableHeaderColumn key={i}>
                            {x.name}
                        </TableHeaderColumn>)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {row}

            </TableBody>
        </Table>
       
    </div>)
}
export default employeeTable;

