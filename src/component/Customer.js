import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
/* ICONS */
/* Styles */
import '../css/Customer.css'

export default class Customer extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      tax: this.props.tax,
      delivery: this.props.delAddress,
      billing: this.props.billAddress,
      address: false,
      edit: false
    }
  }

  openAddresses = () => {
    this.setState({address: true});
  }

  openEdit = () => {
    this.setState({edit: true});
  }

  render() {

    if(this.state.address) {
      return <Redirect to={{
                pathname: '/address',
                state: {
                  id: this.state.id,
                  name: this.state.name, 
                  email: this.state.email,
                  tax: this.state.tax,
                  delivery: this.state.delivery,
                  billing: this.state.billing
                }
              }}
            />;
    } else if( this.state.edit) {
      return <Redirect to={{
        pathname: '/customer-edit',
        state: {
          id: this.state.id,
          name: this.state.name, 
          email: this.state.email,
          password: this.state.password,
          tax: this.state.tax
        }
      }}
    />;
    }

    return (
      <div className="customer-container">
        <p className="customer-name">{this.state.name}</p>
        <p className="customer-email">{this.state.email}</p>
        <p className="customer-tax">{this.state.tax}</p>
        <button className="customer-edit-btn" onClick={this.openEdit}>Edit</button>
        <button className="customer-address-btn" onClick={this.openAddresses} >Address</button>
      </div>
    )
  }
}
