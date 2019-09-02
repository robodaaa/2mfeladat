import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import axios from 'axios'

import '../css/EditCustomer.css'

export default class EditCustomer extends Component {
  constructor(props){
    super(props);
      this.state = {
        id: this.props.location.state.id,
        name: this.props.location.state.name,
        email: this.props.location.state.email,
        password: this.props.location.state.password,
        tax: this.props.location.state.tax,
        redirect: false
      }
  }

  saveCustomerData = () => {
    if( this.state.name === '' 
        || this.state.email === '' 
        || this.state.password === '' 
        || this.state.tax === '' ) {
      this.setState({ empty: true});
    } else {
      const data = {
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        tax: this.state.tax
      };

      const myJSON = JSON.stringify(data);

      axios.post(`http://192.168.0.102/feladat/src/api/editCustomer.php`, myJSON)
      .then((response) => {
        if(response.status === 200){
          this.setState({ redirect: true });
        }
      }).catch(function (error) { console.log(error); });
    }
  }

  deleteCustomer = () => {
    const data = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      tax: this.state.tax
    };

    const myJSON = JSON.stringify(data);

    axios.post(`http://192.168.0.102/feladat/src/api/deleteCustomer.php`, myJSON)
    .then((response) => {
      if(response.status === 200){
        this.setState({ redirect: true });
      }
    }).catch(function (error) { console.log(error); });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  render() {
    if(this.state.redirect){
      return <Redirect to='/' />;
    }
    return (
      <div className="customer-edit-container">
        <h1 className="customer-edit-title">Edit customer</h1>
        <input  className="customer-edit-input" 
                type="text" 
                name="name" 
                defaultValue={this.state.name} 
                onChange={this.handleChange} 
        />
        <input  className="customer-edit-input" 
                type="text" 
                name="email" 
                defaultValue={this.state.email} 
                onChange={this.handleChange} 
        />
        <input  className="customer-edit-input" 
                type="password" 
                name="password" 
                defaultValue={this.state.password}
                onChange={this.handleChange} 
        />
        <input  className="customer-edit-input" 
                type="text" 
                name="tax" 
                defaultValue={this.state.tax} 
                onChange={this.handleChange} 
        />
        <button className="customer-btn" onClick={this.saveCustomerData}>Save</button>
        <button className="customer-btn-delete" onClick={this.deleteCustomer}>Delete</button>
      </div>
    )
  }
}