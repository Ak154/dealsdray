import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav>
        <Link to="/" className="title">
          Home
        </Link>
        <ul>
          <li></li>
          <li>
            <NavLink to="/employeelist">Employee List</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
