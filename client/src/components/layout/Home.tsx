"use client";

import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListGigs from "../gigs/ListGigs";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { getGigs } from "@/redux/Features/gigSlices";

const Home = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();

  const { gigs, isloading } = useSelector((state: any) => state.gig);

  useEffect(() => {
    dispatch(getGigs());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center gap-6 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Find & Hire Talent with <span className="text-primary">GigFlow</span>
        </h1>

        <p className="max-w-xl text-muted-foreground">
          A modern gig marketplace to post jobs, bid on gigs
        </p>

        <div className="flex gap-4">
          {user ? (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/register?role=freelancer">
                <Button size="lg">Get Started as Freelancer</Button>
              </Link>
              <Link to="/register?role=client">
                <Button size="lg" variant={"outline"}>
                  Get Started as Client
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>
      <section>
        <ListGigs gigs={gigs} isloading={isloading} buttons="all" />
      </section>
    </div>
  );
};

export default Home;
