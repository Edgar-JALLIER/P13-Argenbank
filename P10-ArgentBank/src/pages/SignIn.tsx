import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const SignIn = () => {
  // const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // const testStore = useSelector((state) => state);
  // console.log(testStore);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      console.log("Authentification réussie:", response.data);
      // Rediriger l'utilisateur vers une autre page ou mettre à jour l'état de l'sauthentification, etc.
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      setError("Email ou mot de passe incorrect");
    }

    // Envoi des données au serveur pour authentification
    // dispatch(loginUser({ email, password }));

    // Réinitialiser les champs du formulaire après la soumission
    setEmail("");
    setPassword("");
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      }
    };

    fetchUsers();
  }, []);
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
            {error && <p className="error-message">{error}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;
