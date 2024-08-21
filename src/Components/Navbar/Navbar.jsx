import React from 'react';
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom';
import { AiFillReconciliation, AiFillSetting, AiOutlineShop } from "react-icons/ai"
import { FaMapLocationDot } from 'react-icons/fa6';
import { BiSolidCity } from 'react-icons/bi';
import { IoCarSport } from 'react-icons/io5';

const Navbar = () => {
    return (
        <div className='navbar d-flex'>
            <h2 className="navbar-title">AutozoomAdmin</h2>

            <ul className="navbar-list">
                <li className="navbar-item">
                    <NavLink className={({ isActive }) => (isActive ? 'navbar-active' : 'navbar-link')} to={'/home'}>
                        <span className='icons'><AiFillSetting /></span>
                        <span>Settings</span>
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink className={({ isActive }) => (isActive ? 'navbar-active' : 'navbar-link')} to={'/brands'}>
                        <span className='icons'><AiOutlineShop /></span>
                        <span>Brands</span>
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink className={({ isActive }) => (isActive ? 'navbar-active' : 'navbar-link')} to={'/models'}>
                        <span className='icons'><AiFillReconciliation /></span>
                        <span>Models</span>
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink className={({ isActive }) => (isActive ? 'navbar-active' : 'navbar-link')} to={'/locations'}>
                        <span className='icons'><FaMapLocationDot /></span>
                        <span>Locations</span>
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink className={({ isActive }) => (isActive ? 'navbar-active' : 'navbar-link')} to={'/cities'}>
                        <span className='icons'><BiSolidCity /></span>
                        <span>Cities</span>
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink className={({ isActive }) => (isActive ? 'navbar-active' : 'navbar-link')} to={'/cars'}>
                        <span className='icons'><IoCarSport /></span>
                        <span>Cars</span>
                    </NavLink>
                </li>
            </ul>
            {/* <Outlet /> */}
        </div>
    );
}

export default Navbar;
