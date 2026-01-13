"use client";

import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { getmyGig } from "@/redux/Features/gigSlices";
import ListGigs from "@/components/gigs/ListGigs";
import ListBids from "@/components/bits/ListBids";
import { getMyBids } from "@/redux/Features/bidSlices";
import { socket } from "@/socket/socket";
import { toast } from "sonner";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const {
    user,
    checkAuth,
    isLoading: authLoading,
  } = useSelector((state: any) => state.auth);

  const { myGigs, isLoading } = useSelector((state: any) => state.gig);

  const { mybids } = useSelector((state: any) => state.bid);

  if (!user) return null;

  useEffect(() => {
    if (!user || !checkAuth) return;

    socket.on("hired", (data) => {
      toast.success(data.message);
      dispatch(getMyBids(user._id));
    });

    return () => {
      socket.off("hired");
    };
  }, [user, checkAuth, dispatch]);

  useEffect(() => {
    if (!checkAuth || !user) return;

    if (user.role === "client") {
      dispatch(getmyGig(user._id));
    }

    if (user.role === "freelancer") {
      dispatch(getMyBids(user._id));
    }
  }, [dispatch, user, checkAuth]);

  if (!checkAuth || authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="text-muted-foreground capitalize">Role: {user.role}</p>
      </div>

      {/* ================= CLIENT DASHBOARD ================= */}
      {user.role === "client" && (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Posted Gigs</CardTitle>
              <Link to="/create-gig">
                <Button>Create Post</Button>
              </Link>
            </CardHeader>

            <CardContent className="space-y-4">
              <ListGigs gigs={myGigs} isloading={isLoading} buttons="all" />
            </CardContent>
          </Card>
        </>
      )}

      {/* ================= FREELANCER DASHBOARD ================= */}
      {user.role === "freelancer" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Your Bids</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <ListBids bids={mybids} buttons={["none"]} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;
