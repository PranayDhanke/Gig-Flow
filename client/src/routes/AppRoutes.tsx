import { Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import GigDetails from "@/pages/gigs/GigDetails";
import Home from "@/components/layout/Home";
import Dashboard from "@/pages/Profile/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";
import PublicRoute from "./PublicRoutes";
import GigsPage from "@/pages/gigs/GigsPage";
import Profile from "@/pages/Profile/Profile";
import CreateGig from "@/pages/gigs/CreateGig";
import CreateBid from "@/pages/bits/CreateBid";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<GigsPage />} />
        <Route path="/gig-detail/:gigId" element={<GigDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-gig" element={<CreateGig />} />
          <Route path="/create-bid/:gigId" element={<CreateBid />} />
        </Route>
      </Route>
    </Routes>
  );
};
