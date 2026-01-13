"use client";

import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { getGig } from "@/redux/Features/gigSlices";
import BidForGigs from "@/components/gigs/BidForGigs";

const GigDetails = () => {
  const { gigId } = useParams<{ gigId: string }>();
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: any) => state.auth);
  const { gig, isloading, error } = useSelector((state: any) => state.gig);

  useEffect(() => {
    if (gigId) {
      dispatch(getGig(gigId));
    }
  }, [gigId, dispatch , user]);

  if (isloading) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        Loading gig details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-20 text-red-500">{error}</div>
    );
  }

  if (!gig) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        Gig not found
      </div>
    );
  }

  const isFreelancer = user?.role === "freelancer";
  const isOpen = gig.status === "open";

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      {/* HEADER */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{gig.title}</h1>

        <div className="flex flex-wrap items-center gap-2">
          <Badge>{gig.status}</Badge>
          <Badge variant="secondary">Budget ₹{gig.budget}</Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Posted by{" "}
          <span className="font-medium text-foreground">
            {gig.postedBy?.name}
          </span>{" "}
          · {new Date(gig.createdAt).toLocaleDateString()}
        </p>
      </div>

      <Separator />

      {/* MAIN CONTENT */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* DESCRIPTION */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gig Description</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              {gig.description}
            </CardContent>
          </Card>
        </div>

        {/* ACTION PANEL */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {isOpen && isFreelancer && (
                <Link to={`/create-bid/${gigId}`}>
                  <Button className="w-full">Place a Bid</Button>
                </Link>
              )}

              {isOpen && !isFreelancer && (
                <Button disabled className="w-full">
                  Bidding Open for Freelancers
                </Button>
              )}

              {isOpen && !user && (
                <Link to="/login">
                  <Button className="w-full">Login to Place Bid</Button>
                </Link>
              )}

              {!isOpen && (
                <Button disabled className="w-full">
                  Bidding Closed
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        {user && user.role === "client" && (
          <>
            <BidForGigs />
          </>
        )}
      </div>
    </div>
  );
};

export default GigDetails;
