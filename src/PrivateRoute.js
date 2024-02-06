import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ Component }) => {
  const loggedIn = sessionStorage.getItem("user") ? true : false;
  console.log(
    `sessionStorage.getItem("user") - ${sessionStorage.getItem("user")}`
  );
  console.log(loggedIn);

  return loggedIn ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
