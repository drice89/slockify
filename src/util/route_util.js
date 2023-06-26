import React from "react";
import { Route, useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const Auth = ({ component: Component, path, userId, exact }) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!userId) {
    return <Component />;
  } else {
    // Anti pattern. Should return user to previously viwed page
    navigate(`/client/${userId}/6`, { replace: true, state: { from: location } });
    return null;
  }
};

const Protected = ({ component: Component, path, userId, exact }) => {
  const navigate = useNavigate();

  if (userId) {
    return <Component />;
  } else {
    navigate("/login", { replace: true });
    return null;
  }
};

const mapStateToProps = (state) => {
  return { userId: state.session.id };
};

export const AuthRoute = connect(mapStateToProps)(Auth);
export const ProtectedRoute = connect(mapStateToProps)(Protected);


// import React from "react";
// import { Route, useLocation, useNavigate } from "react-router-dom"
// import { connect } from "react-redux"

// const Auth = ({ component: Component, path, userId, exact }) => (
//   <Route
//     path={path}
//     exact={exact}
//     render={(props) =>
//       !userId ? <Component {...props} /> : <Navigate to={`/client/${userId}/6`} />
//     }
//   />
// );

// const Protected = ({ component: Component, path, userId, exact }) => (
//   <Route
//     path={path}
//     exact={exact}
//     render={(props) =>
//       userId ? <Component {...props} /> : <Navigate to="/login" />
//     }
//   />
// );


// const mapStateToProps = (state) => {
//   return { userId: state.session.id };
// };

// export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
// export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

