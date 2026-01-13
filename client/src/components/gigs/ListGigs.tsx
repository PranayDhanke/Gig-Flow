"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";

import type { Gig } from "@/types/gig";

const ListGigs = ({
  gigs,
  isloading,
  buttons,
}: {
  gigs: Gig[];
  isloading: boolean;

  buttons: "all" | "none";
}) => {
  const [search, setSearch] = useState("");

  const filteredGigs = gigs.filter((gig: Gig) =>
    gig.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Browse Gigs</h1>

        <Input
          placeholder="Search gigs..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isloading ? (
        "laoding"
      ) : (
        <>
          {/* GIG LIST */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredGigs.map((gig: Gig) => (
              <Card key={gig._id}>
                <CardHeader>
                  <CardTitle className="">{gig.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={gig.status === "open" ? "default" : "outline"}
                    >
                      {gig.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Budget: ₹{gig.budget}
                  </p>

                  {buttons === "all" && (
                    <Link to={`/gig-detail/${gig._id}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredGigs.length === 0 && (
            <p className="text-center text-muted-foreground">No gigs found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ListGigs;
