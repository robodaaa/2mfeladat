import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

/* Stylesheet */
import './css/App.css';

/* Components */
import Menu from './component/Menu'
import Dashboard from './component/Dashboard'
import AddCustomer from './pages/AddCustomer';
import EditCustomer from './pages/EditCustomer';
import Address from './pages/Address';
import EditAddress from './pages/EditAddress';
import AddAddress from './pages/AddAddress';

function App() {
  return (
    <Router>
      <div>
        <Menu />
        <Route exact path="/" component={Dashboard} />
        <Route path="/customer-add" component={AddCustomer} />
        <Route path="/customer-edit" component={EditCustomer} />
        <Route path="/address" component={Address} />
        <Route path="/address-add" component={AddAddress} />
        <Route path="/address-edit" component={EditAddress} />
      </div>
    </Router>
  );
}

export default App;
