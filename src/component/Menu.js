import React, { Component } from 'react'
import { Link } from "react-router-dom";
import '../css/Menu.css'
import { MdPersonAdd, MdHome } from "react-icons/md";



export default class Menu extends Component {
    render() {
        return (
            <header className="menu-container">
                <label className="menu-title">2MFeladat</label>
                <Link className="user-btn" to="/customer-add"><MdPersonAdd color="white" size={35}/></Link>  
                <Link className="user-btn" to="/"><MdHome color="white" size={35}/></Link>     
            </header>
        )
    }
}
