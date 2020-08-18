import React, { useState } from "react";
import { inject } from "mobx-react";
import { makeStyles, Button } from "@material-ui/core";
import LoginModal from "../modals/LoginModal";
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

const NavBar = ({ authStore }) => {
  const isAuthenticated = authStore.token;
  const [visloginModal, setVisLoginModal] = useState(false);

  const classes = useStyles();

  return (
    <div className={classes.navbar}>
      <div className={classes.header}>
        <h1 style={{ fontSize: 14, color: "white" }}>THE AUCTION HOUSE</h1>
      </div>
      <div className={classes.loginLogoutContainer}>
        {
          <Button
            className={classes.button}
            onClick={() => setVisLoginModal(true)}
          >
            Sign in
          </Button>
        }
        {<Button className={classes.button}>Sign Up</Button>}

        {isAuthenticated && (
          <Button
            className={classes.button}
             onClick={() => authStore.signOut({})}
          >
            Sign out
          </Button>
        )}
      </div>
      <LoginModal visloginModal={visloginModal} setVisLoginModal={setVisLoginModal}/>
    </div>
  );
};

export default inject(["authStore"])(NavBar);
