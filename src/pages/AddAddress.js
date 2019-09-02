import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import axios from 'axios'


export default class AddAddress extends Component {
  constructor(props){
    super(props);
    this.state = {
      customerId: this.props.location.state.id,
      zip: '',
      country:'',
      city: '',
      street: '',
      house: '',
      empty: false
    }  
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  sendData = () => {
    if( this.state.zip === '' 
        || this.state.country === '' 
        || this.state.city === '' 
        || this.state.street === ''
        || this.state.house === '' ) {
      this.setState({ empty: true});
    } else {
      const data = {
        customerId: this.state.customerId,
        zip: this.state.zip,
        country: this.state.country,
        city: this.state.city,
        street: this.state.street,
        house: this.state.house
      };
  
      const myJSON = JSON.stringify(data);
  
      axios.post(`http://192.168.0.102/feladat/src/api/addAddress.php`, myJSON)
      .then((response) => {
        if(response.status === 200){
          this.setState({ redirect: true });
        }
      }).catch(function (error) { console.log(error); });
    }
  }

  getEmptyMessage = () => {
    if(this.state.empty){
      return(
        <div>
          <p className="emptyError">Please fill all inputs!</p>
        </div>
      )
    }

  }

  render() {
    if(this.state.redirect){
      return <Redirect to='/' />;
    }
    return (
      <div className="add-container">
          <h1 className="add-conatiner-title">Add new address</h1>
          {this.getEmptyMessage() }
          <input className="add-container-input" type="text" placeholder="Zip" name="zip" onChange={this.handleChange}/>
          <input className="add-container-input" type="text" placeholder="Country" name="country" onChange={this.handleChange}/>
          <input className="add-container-input" type="text" placeholder="City" name="city" onChange={this.handleChange}/>
          <input className="add-container-input" type="text" placeholder="Street" name="street" onChange={this.handleChange}/>
          <input className="add-container-input" type="text" placeholder="House number" name="house" onChange={this.handleChange}/>
          <button className="add-btn" onClick={this.sendData}>Add</button>
      </div>
    )
  }
}
