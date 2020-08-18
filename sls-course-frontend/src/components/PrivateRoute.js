import React, { useEffect , useState } from "react";
import { Route } from "react-router-dom";
import { inject } from "mobx-react";
import LoginModal from "../modals/LoginModal";

const PrivateRoute = ({ component: Component, authStore, path, ...rest }) => {
  let isAuthenticated = authStore.token;
  const [visloginModal, setVisLoginModal] = useState(false);

  useEffect(() => {
    if (authStore.token) {
      return;
    }
    setVisLoginModal(true)
  }, [authStore]);

  const render = (props) =>
  isAuthenticated ? (
      <Component {...props} />
    ) : (
      <LoginModal visloginModal={visloginModal} setVisLoginModal={setVisLoginModal}/>
    );

  return <Route path={path} render={render} {...rest} />;
};
export default inject("authStore")(PrivateRoute);
