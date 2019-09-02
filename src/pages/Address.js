import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import Addresses from '../component/Addresses'
import axios from 'axios'
import '../css/Address.css'
import { GoPackage, GoCreditCard } from "react-icons/go";

export default class Address extends Component {
  constructor(props){
    super(props);
      this.state = {
        id: this.props.location.state.id,
        name: this.props.location.state.name,
        email: this.props.location.state.email,
        tax: this.props.location.state.tax,
        deliveryId: this.props.location.state.delivery,
        deliveryData: [],
        billingId: this.props.location.state.billing,
        billingData: [],
        redirect: false
      }
  }

  componentDidMount = () => {
    this.getDeliveryData();
    this.getBillingData();
  }

  openAddAddress = () => {
    this.setState({redirect: true});
  }

  getDeliveryData = () => {
    const data = {
      id: this.state.deliveryId,
    };

    const myJSON = JSON.stringify(data);

    axios.post(`http://192.168.0.102/feladat/src/api/getAddressById.php`, myJSON)
    .then((response) => {
        this.setState({ deliveryData: response.data});
    }).catch(function (error) { console.log(error); });
  }

  getBillingData = () => {
    const data = {
      id: this.state.billingId,
    };

    const myJSON = JSON.stringify(data);

    axios.post(`http://192.168.0.102/feladat/src/api/getAddressById.php`, myJSON)
    .then((response) => {
        this.setState({ billingData: response.data});
    }).catch(function (error) { console.log(error); });
  }

  render() {
    if(this.state.redirect){
      return <Redirect to={{
        pathname: '/address-add',
        state: {
          id: this.state.id,
        }
      }}
    />;
    }
    return (
      <div className="address-container-main">
        <div className="address-customer-container">
          <h4 className="address-customer-name">{this.state.name}  
            <i className="address-customer-tax">  ({this.state.tax})</i>
          </h4>
          <p className="address-customer-email">{this.state.email}</p>
          <p className="address-customer-delivery">
              <GoPackage size="20" /> 
              {" "+this.state.deliveryData[3]},
              {this.state.deliveryData[4]}
              {" "+this.state.deliveryData[5]}
          </p>
          <p className="address-customer-billing">
            <GoCreditCard size="21" />
            {" "+this.state.billingData[3]},
            {this.state.billingData[4]+" "}
            {this.state.billingData[5]}
          </p>
          <button className="address-customer-add-btn" onClick={this.openAddAddress} >Add address</button>
        </div>
        <Addresses id={this.state.id} />
      </div>
    )
  }
}
