"use client";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { logoutUser } from "@/redux/Features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const Header = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div>
          <Link to="/" className="text-xl font-bold">
            GigFlow
          </Link>

          {user && (
            <h1 className="tracking-tight">
              Welcome, <span className="text-primary mb-2">{user.name}</span>
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium hover:underline">
            Home
          </Link>

          <Link to="/gigs" className="text-sm font-medium hover:underline">
            Gigs
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium hover:underline"
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                className="text-sm font-medium hover:underline"
              >
                Profile
              </Link>

              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
