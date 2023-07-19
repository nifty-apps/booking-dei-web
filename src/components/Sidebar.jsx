import React, { useState } from "react";
import { NavLink as Link } from 'react-router-dom';

export default function Sidebar() {
  const [bookingMenuOpen, setBookingMenuOpen] = useState(false);

  const toggleBookingMenu = () => {
    setBookingMenuOpen(!bookingMenuOpen);
  };

  return (
    <>
      <aside className="main-sidebar nav-pills sidebar-dark-primary sidebar-no-expand elevation-1">
        <Link to="/dashboard" className="brand-link text-decoration-none">
          <img
            src="https://play-lh.googleusercontent.com/1ilSkBLu0vJwY8b6McwNaEer3tjaBPxFJoOFLlkqvW0HlxSue2mbJxTcUwbtZIsWE1M=w240-h480-rw"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-1"
          />
          <span className="brand-text font-weight-light">Booking Dei</span>
        </Link>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/dashboard/" className="nav-link">
                  <i className="nav-icon fas fa-home"></i>
                  <p>Home</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/hotels" className="nav-link">
                  <i className="nav-icon fas fa-hotel"></i>
                  <p>Hotels</p>
                </Link>
              </li>


              <li className={`nav-item ${bookingMenuOpen ? 'menu-open' : ''}`}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={toggleBookingMenu}
                >
                  <i className="nav-icon fas fa-calendar"></i>
                  <p>Booking</p>
                  <i className="right fas fa-angle-left"></i>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/dashboard/booking" className="nav-link">
                      <i className="fas fa-caret-right nav-icon"></i>
                      <p>All Booking</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard/booking/add" className="nav-link">
                      <i className="fas fa-caret-right nav-icon"></i>
                      <p>Add Booking</p>
                    </Link>
                  </li>
                </ul>
              </li>



              <li className="nav-item">
                <Link to="/dashboard/employees" className="nav-link">
                  <i className="nav-icon fas fa-users"></i>
                  <p>Employees</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/calendar" className="nav-link">
                  <i className="nav-icon fa fa-calendar"></i>
                  <p>Calendar</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/transaction" className="nav-link">
                  <i className="nav-icon fas fa-money-check-alt"></i>
                  <p>Transaction</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/blogs" className="nav-link">
                  <i className="nav-icon fas fa-file"></i>
                  <p>Blogs</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/about" className="nav-link">
                  <i className="nav-icon fas fa-address-card"></i>
                  <p>About</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/users" className="nav-link">
                  <i className="nav-icon fas fa-users"></i>
                  <p>Users</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
