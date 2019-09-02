import React, { Component } from 'react'
import axios from 'axios'
import Customer from './Customer'

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      customers: []
    }    
  }
  
  componentDidMount = () => {
    this.getCustomers();
  }

  getCustomers= () => {
    axios.post(`http://192.168.0.102/feladat/src/api/getCustomers.php`)
    .then((response) => {
        this.setState({ customers: response.data});  
    }).catch(function (error) { console.log(error); });
  }

  render() {
    return (
      <div className="dashboard-container" >
        { this.state.customers.map( 
            (customer) => ( 
              <Customer 
                key={customer[0]}
                id={customer[0]}
                name={customer[1]} 
                email={customer[2]}
                password={customer[3]}
                delAddress={customer[4]}
                billAddress={customer[5]}
                tax={customer[6]} 
              />))}
      </div>
    )
  }
}
