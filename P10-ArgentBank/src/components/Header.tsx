import logo from "../../src/assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../redux/authSlice";
import { RootState } from "../utiles/interfaces";
import userSlice from "../redux/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => (state as RootState).user.userInfo);
  const isAuthenticated = useSelector(
    (state) => (state as RootState).auth.isAuthenticated
  );

  return (
    <nav className="header-nav">
      <Link className="header-nav-logo" to={"/"}>
        <img
          className="header-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </Link>
      {isAuthenticated ? (
        <div>
          <Link className="header-nav-item" to={"/user"}>
            <FontAwesomeIcon icon={faUserCircle} />

            <span>{userInfo?.firstName}</span>
          </Link>

          <Link
            className="header-nav-item"
            to={"/"}
            onClick={() => {
              dispatch(authSlice.actions.logoutUser());
              dispatch(userSlice.actions.setUser(null));
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
