import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import axios from 'axios'

import '../css/AddCustomer.css'

export default class AddCustomer extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email:'',
      password: '',
      tax: '',
      customerId: this.props.customerId,
      redirect: false,
      empty: false
    }  
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  sendData = () => {
    if( this.state.name === '' 
        || this.state.email === '' 
        || this.state.password === '' 
        || this.state.tax === '' ) {
      this.setState({ empty: true});
    } else {
      const data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        tax: this.state.tax
      };
  
      const myJSON = JSON.stringify(data);
  
      axios.post(`http://192.168.0.102/feladat/src/api/addCustomer.php`, myJSON)
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
          <h1 className="add-conatiner-title">Add new customer</h1>
          {this.getEmptyMessage() }
          <input className="add-container-input" type="text" placeholder="Username" name="name" onChange={this.handleChange}/>
          <input className="add-container-input" type="email" placeholder="Email" name="email" onChange={this.handleChange}/>
          <input className="add-container-input" type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
          <input className="add-container-input" type="text" placeholder="Tax number" name="tax" onChange={this.handleChange}/>
          <button className="add-btn" onClick={this.sendData}>Add</button>
      </div>
    )
  }
}

