import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, checkAuth, isLoading } = useSelector((state: any) => state.auth);
  if (isLoading || !checkAuth) {
    return <div>Loading...</div>;
  }
  return user ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
