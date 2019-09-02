import React, { Component } from 'react'
import AddressComponent from './AddressComponent'
import axios from'axios'

export default class Addresses extends Component {
  constructor(props){
    super(props);
    this.state = {
      customerId: this.props.id,
      addresses: [],
      empty: false
    }
  }

  componentDidMount = () => {
    this.getCustomers();
  }

  getCustomers= () => {
    const data = {
      id: this.state.customerId,
    };

    const myJSON = JSON.stringify(data);

    axios.post(`http://192.168.0.102/feladat/src/api/getAddress.php`, myJSON)
    .then((response) => {
        if(response.data === false) {
          this.setState({ empty: true });
        } else {
          this.setState({ addresses: response.data});
        }
    }).catch(function (error) { console.log(error); });
  }

  render() {
    if( this.state.empty) {
      return (
        <div>
          <h4 className="address-not-have">Address not found..</h4>
        </div>
      )
    }
    return (
      <div className="addresses-container">
        { this.state.addresses.map( 
          (address) => ( 
            <AddressComponent 
              key={address[0]}
              id={address[0]}
              zip = {address[1]}
              country = {address[2]}
              city = {address[3]}
              street = {address[4]}
              house = {address[5]}
              customerId = {this.state.customerId}
            />
          ))
        }
      </div>
    )
  }
}
