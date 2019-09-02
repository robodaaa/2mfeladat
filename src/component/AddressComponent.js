import React, { Component } from 'react'
import axios from 'axios'
import '../css/AddressComponent.css'
import { Redirect } from "react-router-dom";

export default class AddressComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      customerId: this.props.customerId,
      id: this.props.id,
      zip: this.props.zip,
      country: this.props.country,
      city: this.props.city,
      street: this.props.street,
      house: this.props.house,
      editPage: false,
      reload: false
    }
  }

  setBilling = () => {
    const data = {
      customerId: this.state.customerId,
      addressId: this.state.id
    };

    const myJSON = JSON.stringify(data);

    axios.post(`http://192.168.0.102/feladat/src/api/setBilling.php`, myJSON)
    .then((response) => {
      if(response.status === 200){
        this.setState({ reload: true });
      }
    }).catch(function (error) { console.log(error); });
  }

  setDelivery = () => {
    const data = {
      customerId: this.state.customerId,
      addressId: this.state.id
    };

    const myJSON = JSON.stringify(data);

    axios.post(`http://192.168.0.102/feladat/src/api/setDelivery.php`, myJSON)
    .then((response) => {
      if(response.status === 200){
        this.setState({ reload: true });
      }
    }).catch(function (error) { console.log(error); });
  }

  openEdit = () => {
    this.setState({ editPage: true});
  }

  render() {
    if(this.state.editPage){
      return <Redirect to={{
        pathname: '/address-edit',
        state: {
          id: this.state.id,
          zip: this.state.zip,
          country: this.state.country, 
          city: this.state.city,
          street: this.state.street,
          house: this.state.house
        }
      }}
    />; 
    }
    if(this.state.reload){
      return <Redirect to="/"/>; 
    }

    return (
      <div className="address-container">
        <p className="address-zip">{this.state.zip}</p>
        <p className="address-country">{this.state.country}</p>
        <p className="address-city">{this.state.city}</p>
        <p className="address-street">{this.state.street}</p>
        <p className="address-house">{this.state.house}</p>
        <button className="address-bill-btn" onClick={this.setBilling} >Delivery</button>
        <button className="address-deli-btn" onClick={this.setDelivery}>Billing</button>
        <button className="address-edit-btn" onClick={this.openEdit}>Edit</button>
      </div>
    )
  }
}
