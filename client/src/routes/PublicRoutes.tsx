import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { user } = useSelector((state: any) => state.auth);
  

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
