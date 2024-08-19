import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

const Dashboard = () => (
  
  <div>
    <nav>
      <ul>
        <li><Link to="overview">Overview</Link></li>
        <li><Link to="details">Details</Link></li>
      </ul>
    </nav>
    <Outlet />
  </div>
);


export default Dashboard;