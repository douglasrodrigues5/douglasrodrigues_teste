import React, { Component } from 'react';
import { setElementValue, enableDiv, disableDiv } from '../../Helpers/ux';
import { createDriver } from '../../Helpers/requests';


class DriverForm extends Component{
    constructor(props) {
        super(props);
        //All the required fields
        this.state = {
          name: '',
          birthdate: '',
          cpf: '',
          carmodel: '',
          status: true,
          sex: 'male'
        };
        
        //Change and submit events
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
      
      handleSubmit(event) {

        //create a driver record THEN disable form-driver
        createDriver(
          this.state.name, 
          this.state.birthdate,
          this.state.cpf,
          this.state.carmodel,
          this.state.status,
          this.state.sex, 
          (data) => {
            disableDiv('form-driver');
            enableDiv('form-travel');

            //Saving data for posterior use.
            localStorage['current_driver_id'] = data.id;
            localStorage['current_driver_name'] = data.name;

            setElementValue('travel-driver', localStorage['current_driver_name'] = data.name);
          }
        );
        event.preventDefault();
      }
    
      render() {
        return (
          <div className={((localStorage['current_driver_id'] != null) ? 'inactive' : 'active')}>
            <h1> Register a new driver </h1>
            <form id="form-driver" onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            </label>
            <label>
              Birthdate:
              <input type="date" name="birthdate" value={this.state.birthdate} onChange={this.handleChange} />
            </label>
            <label>
              Cpf:
              <input type="text" name="cpf" value={this.state.cpf} onChange={this.handleChange} />
            </label>
            <label>
              Car model:
              <input type="text" name="carmodel" value={this.state.carmodel} onChange={this.handleChange} />
            </label>
            <select name="status" onChange={this.handleChange} value={this.state.status}>
              <option value={true}>Active driver</option>
              <option value={false}>Inactive driver</option>
            </select> 
            <select name="sex" onChange={this.handleChange} value={this.state.sex}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
          </div>
          
        );
      }
}

export default DriverForm;