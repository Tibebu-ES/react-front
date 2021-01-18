import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class AddEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
           id: this.props.match.params.id,
           firstName: '',
           lastName: '',
           emailId: ''

        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    componentDidMount(){
       if(this.state.id==-1){
           return
       }else{
        EmployeeService.getEmployeeById(this.state.id).then( (res) => {
            let employee = res.data;
            this.setState({
                firstName: employee.firstName,
                lastName: employee.lastName,
                emailId: employee.emailId
            });
        });
       }
    }

    changeFirstNameHandler = (event) =>{
        this.setState({ firstName: event.target.value});
    }
    changeLastNameHandler = (event) =>{
        this.setState({ lastName: event.target.value});
    }
    changeEmailIdHandler = (event) =>{
        this.setState({ emailId: event.target.value});
    }

    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName,emailId: this.state.emailId};
        console.log('employee =>' + JSON.stringify(employee));
        if(this.state.id==-1){
            EmployeeService.addEmployee(employee).then((res) => {
                this.props.history.push("/employees");
            });
        }else{
            EmployeeService.updateEmployee(this.state.id,employee).then( (res) => {
                this.props.history.push("/employees");
            });
        }
 
    }

    cancel(){
        this.props.history.push("/employees");
    }

    getTitle(){
        return (this.state.id == -1) ? "Add Employee" : "Update Employee"; 
    }

    render() {
        return (
            <div>
               <div className= "container">
                    <div className= "row">
                        <div className ="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className = "text-center">{this.getTitle()}</h3>
                            <div className = "card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email Id:</label>
                                        <input placeholder="Email Id" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailIdHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default AddEmployeeComponent;