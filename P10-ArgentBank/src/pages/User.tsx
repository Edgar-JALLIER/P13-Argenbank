import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { RootState } from "../utiles/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const User = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useSelector((state) => (state as RootState).user.userInfo);
  const isAuthenticated = useSelector(
    (state) => (state as RootState).auth.isAuthenticated
  );
  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
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
                  <form className="form" action="">
                    <div className="container-button">
                      <input
                        className="form-input"
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder={userInfo.firstName}
                      />
                      <input
                        className="form-input"
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder={userInfo.lastName}
                      />
                    </div>
                    <div className="container-button">
                      <button className="form-button">Save</button>
                      <button
                        className="form-button"
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
