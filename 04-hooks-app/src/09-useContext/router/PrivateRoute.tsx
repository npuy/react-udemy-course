import { use, type JSX } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  element: JSX.Element; // React.ReactNode
}

export const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { authStatus } = use(UserContext);

  if (authStatus === "checking") return <>Loading...</>;
  if (authStatus === "authenticated") return element;

  return <Navigate to="/" replace />;
};
