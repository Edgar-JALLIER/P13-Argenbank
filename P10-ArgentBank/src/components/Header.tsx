import logo from "../../src/assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { RootState } from "../utiles/interfaces";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => (state as RootState).auth.isAuthenticated
  );

  return (
    <nav className="header-nav">
      <a className="header-nav-logo" href="/">
        <img
          className="header-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </a>
      {isAuthenticated ? (
        <div>
          <Link className="header-nav-item" to={"#"}>
            <FontAwesomeIcon icon={faUserCircle} />

            <span>Tony</span>
          </Link>

          <Link
            className="header-nav-item"
            to={"/"}
            onClick={() => {
              dispatch(logoutUser());
              localStorage.removeItem("token");
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>Sign Out</span>
          </Link>
        </div>
      ) : (
        <div>
          <Link className="header-nav-item" to={"/signIn"}>
            <FontAwesomeIcon icon={faUserCircle} />
            <span>Sign In</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
