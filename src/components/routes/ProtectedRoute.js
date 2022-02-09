// import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ auth, element: element, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) return <element {...props} />;
        if (!auth)
          return (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedRoute;