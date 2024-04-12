import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authSlice, {
  loginUserSuccess,
  setLoading,
  setError,
} from "../redux/authSlice";
import { RootState } from "../utiles/interfaces";
import userSlice, { setUser } from "../redux/userSlice";
import { fetchAuth } from "../services/authServices";
import { fetchUser } from "../services/userServices";

const SignIn = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => (state as RootState).auth.isAuthenticated
  );
  const error = useSelector((state) => (state as RootState).auth.error);
  const loading = useSelector((state) => (state as RootState).auth.loading);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authSlice.actions.setLoading(true));
    dispatch(userSlice.actions.setLoading(true));
    try {
      const authUser = await fetchAuth(email, password);
      const getUser = await fetchUser(authUser.token);

      console.log("Authentification réussie:", authUser);
      console.log("Utilisateur connecté:", getUser);
      localStorage.setItem("token", authUser.token);
      dispatch(loginUserSuccess());
      dispatch(setUser(getUser));
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      dispatch(authSlice.actions.setError("Email ou mot de passe incorrect"));
      dispatch(
        userSlice.actions.setError(
          "Impossible de récupérer les infos utilisateur"
        )
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} />
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                required
                type="text"
                id="username"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me </label>
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
            {loading && <p>Chargement ...</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;
