import { Navigate } from "react-router-dom";
import { getUser } from "../helpers/auth";

export default function ProtectedRoute({ children }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
