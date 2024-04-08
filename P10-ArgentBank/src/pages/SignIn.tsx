import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginUserSuccess, setLoading, setError } from "../redux/authSlice";
import { RootState } from "../utiles/interfaces";

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
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        {
          email,
          password,
        }
      );
      const getUser = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        null, // corps de la requête vide car aucune donnée supplémentaire n'est nécessaire
        {
          headers: {
            Authorization: `Bearer ${response.data.body.token}`,
          },
        }
      );
      console.log("Authentification réussie:", response.data);
      console.log("Utilisateur connecté:", getUser);
      localStorage.setItem("token", response.data.body.token);
      dispatch(loginUserSuccess());
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      dispatch(setError("Email ou mot de passe incorrect"));
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
