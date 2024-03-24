import logo from "../../src/assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [userIsConnected, setUserIsConnected] = useState(false);

  return (
    <nav className="header-nav">
      <a className="header-nav-logo" href="/">
        <img
          className="header-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </a>
      {userIsConnected ? (
        <div>
          <Link className="header-nav-item" to={"#"}>
            <FontAwesomeIcon icon={faUserCircle} />

            <span>Tony</span>
          </Link>

          <Link
            className="header-nav-item"
            to={"/"}
            onClick={() => setUserIsConnected(false)}
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
