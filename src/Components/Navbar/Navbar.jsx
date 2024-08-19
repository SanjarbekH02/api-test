import React from 'react';
import './Navbar.css'
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar d-flex'>
            <h2 className="navbar-title">AutozoomAdmin</h2>

            <ul className="navbar-list">
                <li className="navbar-item">
                    <a href="" className="navbar-link">Dashbaord</a>
                </li>
                <li className="navbar-item">
                    <a href="" className="navbar-link">Settings</a>
                </li>
                <li className="navbar-item">
                    <a href="" className="navbar-link">Brands</a>
                </li>
                <li className="navbar-item">
                    <a href="" className="navbar-link">Models</a>
                </li>
                <li className="navbar-item">
                    <a href="" className="navbar-link">Locations</a>
                </li>
                <li className="navbar-item">
                    <a href="" className="navbar-link">Cities</a>
                </li>
                <li className="navbar-item">
                    <a href="" className="navbar-link">Cars</a>
                </li>
            </ul>
            <Outlet />
        </div>
    );
}

export default Navbar;
