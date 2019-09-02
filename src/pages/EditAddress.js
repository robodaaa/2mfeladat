import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import axios from 'axios'

export default class EditAddress extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.location.state.id,
      zip: this.props.location.state.zip,
      country: this.props.location.state.country, 
      city: this.props.location.state.city,
      street: this.props.location.state.street,
      house: this.props.location.state.house,
      customer: 1,
      empty: false,
      redirect: false
    }
  }

  saveCustomerData = () => {
    if( this.state.zip === '' 
        || this.state.country === '' 
        || this.state.city === '' 
        || this.state.street === ''
        || this.state.house === '' ) {
      this.setState({ empty: true});
    } else {
      const data = {
        id: this.state.id,
        zip: this.state.zip,
        country: this.state.country,
        city: this.state.city,
        street: this.state.street,
        house: this.state.house,
        customer: this.state.customer
      };

      const myJSON = JSON.stringify(data);
      console.log(myJSON);
      axios.post(`http://192.168.0.102/feladat/src/api/editAddress.php`, myJSON)
      .then((response) => {
        if(response.status === 200){
          this.setState({ redirect: true });
        }
      }).catch(function (error) { console.log(error); });
    }
  }

  deleteAddress = () => {
    const data = {
      id: this.state.id,
    };

    const myJSON = JSON.stringify(data);

    axios.post(`http://192.168.0.102/feladat/src/api/deleteAddress.php`, myJSON)
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
        <h1 className="customer-edit-title">Edit Address</h1>
        <input  className="customer-edit-input" 
                type="text" 
                name="zip" 
                defaultValue={this.state.zip} 
                onChange={this.handleChange} 
        />
        <input  className="customer-edit-input" 
                type="text" 
                name="country" 
                defaultValue={this.state.country} 
                onChange={this.handleChange} 
        />
        <input  className="customer-edit-input" 
                type="text" 
                name="city" 
                defaultValue={this.state.city}
                onChange={this.handleChange} 
        />
        <input  className="customer-edit-input" 
                type="text" 
                name="street" 
                defaultValue={this.state.street} 
                onChange={this.handleChange} 
        />
        <input  className="customer-edit-input" 
                type="text" 
                name="house" 
                defaultValue={this.state.house} 
                onChange={this.handleChange} 
        />
        <button className="customer-btn" onClick={this.saveCustomerData}>Save</button>
        <button className="customer-btn-delete" onClick={this.deleteAddress}>Delete</button>
      </div>
    )
  }
}
