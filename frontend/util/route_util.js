import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom"
import { connect } from "react-redux"

const Auth = ({ component: Component, path, userId, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      !userId ? <Component {...props} /> : <Redirect to={`/client/${userId}/6`} />
    }
  />
);

const Protected = ({ component: Component, path, userId, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      userId ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);


const mapStateToProps = (state) => {
  return { userId: state.session.id };
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));