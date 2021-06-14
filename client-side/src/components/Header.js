import React from "react";
import currentUser, { isAdmin } from "../services/apollo/cache";
import { Link } from "react-router-dom";
import { isExpired } from "../services/authService";
import '../../public/assets/header.css'

const Header = () => {
  return (
    <div className="main body">
      <nav>

        <ul className="menu">
          <li><Link to="/home">
            <span> home </span>
          </Link></li>

          {!isExpired() ? (
            <React.Fragment>
              <li><Link to={`/profile/${currentUser()._id}`}>
                <span> {currentUser && currentUser().username}</span>
              </Link></li>
              <li><Link to="/logout">
                <span> logout </span>
              </Link></li>
              {isAdmin() && <li><Link to="/users">Users</Link></li>}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li><Link to="/register">
                <span> register</span>
              </Link></li>
              <li><Link to="/login">
                <span> login</span>
              </Link></li>
            </React.Fragment>
          )}
          </ul>
        </nav>
      </div>
  );
};

export default Header;
