import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
const Navbar = ({ user }) => {
    const history=useHistory();
    const handleLogout=()=>{
        auth.signOut();
        history.push("/login")
    }
  return (
    <div>
      <nav>
        <div className="nav-wrapper">   
          <Link to="/" className="brand-logo">
            Logo
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {user ? (
              <button className="waves-effect waves-light btn" onClick={handleLogout} >Logout</button>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup"> Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
