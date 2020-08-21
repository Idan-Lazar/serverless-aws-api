import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { makeStyles, Button } from "@material-ui/core";
import LoginModal from "../modals/LoginModal";
import RegistarModal from "../modals/RegistarModal";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  navbar: {
    background:
      "linear-gradient(90deg, rgba(190,52,32,1) 0%, rgba(231,75,77,1) 48%, rgba(231,148,74,1) 100%)",
    padding: 14,
    marginBottom: 24,
    display: "flex",
    width: "100%",
    boxSizing: "border-box",
  },
  header: {
    flexBasis: "50%",
    display: "flex",
  },
  loginLogoutContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexBasis: "50%",
  },
  button: {
    color: "white",
  },
});

const NavBar = ({ authStore, routerHistory }) => {
  const [visloginModal, setVisLoginModal] = useState(false);
  const [visRegistarModal, setVisRegistarModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    authStore.token ? true : false
  );
  const classes = useStyles();

  useEffect(() => {
    setIsAuthenticated(authStore.token ? true : false);
    setVisLoginModal(false)
  }, [authStore.token]);

  const signOut = () => {
    authStore.signOut();
     routerHistory.push('/'); 
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.header}>
        <h1 style={{ fontSize: 14, color: "white" }}>THE AUCTION HOUSE</h1>
      </div>
      <div className={classes.loginLogoutContainer}>

        {!isAuthenticated && (
          <Button
            className={classes.button}
            onClick={() => setVisLoginModal(true)}
          >
            Sign in
          </Button>
        )}
        {!isAuthenticated && (
          <Button
            className={classes.button}
            onClick={() => setVisRegistarModal(true)}
          >
            Sign Up
          </Button>
        )}

        {isAuthenticated && (
          <Button className={classes.button} onClick={() => signOut()}>
            Sign out
          </Button>
        )}
      </div>
      <LoginModal
        visloginModal={visloginModal}
        setVisLoginModal={setVisLoginModal}
      />
      <RegistarModal
        visRegistarModal={visRegistarModal}
        setVisRegistarModal={setVisRegistarModal}
      />
    </div>
  );
};

export default inject("authStore", "routerHistory")(observer(NavBar));
