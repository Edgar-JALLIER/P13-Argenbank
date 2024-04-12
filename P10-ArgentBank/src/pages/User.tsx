import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { RootState } from "../utiles/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useEffect, useRef, useState } from "react";
import { updateUser } from "../services/userServices";
import userSlice from "../redux/userSlice";

const User = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useSelector((state) => (state as RootState).user.userInfo);
  const isAuthenticated = useSelector(
    (state) => (state as RootState).auth.isAuthenticated
  );
  const token = useSelector((state) => (state as RootState).auth.token);
  const navigate = useNavigate();
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstnameValue = firstnameRef.current!.value;
    const lastnameValue = lastnameRef.current!.value;

    try {
      const user = await updateUser(token!, firstnameValue, lastnameValue);
      dispatch(userSlice.actions.setUser(user));
      setIsOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signIn");
    }
  });

  return (
    <>
      {!isAuthenticated ? (
        <p>You must be logged in</p>
      ) : (
        <>
          <Header />
          {userInfo === null ? (
            <p>Impossible de récupérer les informations utilisateurs</p>
          ) : (
            <main className="main bg-dark">
              <div className="header">
                <h1>
                  Welcome back
                  <br />
                  {userInfo.firstName} {userInfo.lastName} !
                </h1>
                {isOpen ? (
                  <form className="form" onSubmit={handleSubmit}>
                    <div className="container-button">
                      <input
                        required
                        className="form-input"
                        type="text"
                        id="firstName"
                        name="firstName"
                        ref={firstnameRef}
                        placeholder={userInfo.firstName}
                      />
                      <input
                        required
                        className="form-input"
                        type="text"
                        id="lastName"
                        name="lastName"
                        ref={lastnameRef}
                        placeholder={userInfo.lastName}
                      />
                    </div>
                    <div className="container-button">
                      <button type="submit" className="form-button">
                        Save
                      </button>
                      <button
                        className="form-button"
                        type="button"
                        onClick={() => handleClick()}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button className="edit-button" onClick={() => handleClick()}>
                    Edit Name
                  </button>
                )}
              </div>

              <h2 className="sr-only">Accounts</h2>
              <section className="account">
                <div className="account-content-wrapper">
                  <h3 className="account-title">
                    Argent Bank Checking (x8349)
                  </h3>
                  <p className="account-amount">$2,082.79</p>
                  <p className="account-amount-description">
                    Available Balance
                  </p>
                </div>
                <div className="account-content-wrapper cta">
                  <button className="transaction-button">
                    View transactions
                  </button>
                </div>
              </section>
              <section className="account">
                <div className="account-content-wrapper">
                  <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                  <p className="account-amount">$10,928.42</p>
                  <p className="account-amount-description">
                    Available Balance
                  </p>
                </div>
                <div className="account-content-wrapper cta">
                  <button className="transaction-button">
                    View transactions
                  </button>
                </div>
              </section>
              <section className="account">
                <div className="account-content-wrapper">
                  <h3 className="account-title">
                    Argent Bank Credit Card (x8349)
                  </h3>
                  <p className="account-amount">$184.30</p>
                  <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                  <button className="transaction-button">
                    View transactions
                  </button>
                </div>
              </section>
            </main>
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default User;
