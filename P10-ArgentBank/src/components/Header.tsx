import logo from "../../src/assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../redux/authSlice";
import { RootState } from "../utiles/interfaces";
import userSlice from "../redux/userSlice";
import { fetchUser } from "../services/userServices";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => (state as RootState).user.userInfo);
  const isAuthenticated = useSelector(
    (state) => (state as RootState).auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      const fetchAndSetUser = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Token not found");
          }
          const fetchedUser = await fetchUser(token);
          dispatch(userSlice.actions.setUser(fetchedUser));
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      };

      fetchAndSetUser();
    }
  }, [isAuthenticated, dispatch]);

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
