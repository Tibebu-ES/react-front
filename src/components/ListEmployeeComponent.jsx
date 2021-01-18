import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            employees: []

        }
        //bind event
        this.addEmployeeHandler = this.addEmployeeHandler.bind(this);
        this.updateEmployeeHandler = this.updateEmployeeHandler.bind(this);
    }


    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    addEmployeeHandler(){
        this.props.history.push("/add-employee/-1");

    }

    updateEmployeeHandler(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    render() {
        return (
            <div>
               <h2 className="text-center">Employees List</h2> 
                <div className = "row">
                    <button className ="btn btn-primary" onClick= {this.addEmployeeHandler}> Add Employee</button>
                </div>

               <div className="row">
                    <table className ="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key = {employee.id}>
                                        <td> {employee.firstName}</td>
                                        <td> {employee.lastName}</td>
                                        <td> {employee.emailId}</td>
                                        <td> <button className="btn btn-info" onClick={()=> this.updateEmployeeHandler(employee.id)}>Update</button> </td>
                                    </tr>
                                )

                            }
                        </tbody>
                    </table>

               </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;