"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Bid } from "@/types/bid";
import { useAppDispatch } from "@/redux/hooks";
import { getGigBid, hireFreelancer } from "@/redux/Features/bidSlices";
import { useSelector } from "react-redux";

const ListBids = ({
  bids,
  buttons,
}: {
  bids: Bid[];
  buttons: ["all" | "none"];
}) => {
  const { loading } = useSelector((state: any) => state.bid);
  const dispatch = useAppDispatch();

  const performAction = (bidId: string, gigId: string) => {
    dispatch(hireFreelancer(bidId)).then(() => {
      dispatch(getGigBid(gigId));
    });
  };

  return (
    <div className="mx-auto  space-y-6">
      {bids.length === 0 && (
        <p className="text-muted-foreground">No bids yet.</p>
      )}

      {bids.map((bid: Bid) => (
        <Card key={bid._id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{bid.freelancer.name}</CardTitle>
            <Badge
              variant={
                bid.status === "hired"
                  ? "default"
                  : bid.status === "rejected"
                  ? "destructive"
                  : "secondary"
              }
            >
              {bid.status}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{bid.message}</p>

            <div className="flex items-center justify-between">
              <p className="font-medium">Bid Amount: ₹{bid.price}</p>

              {buttons.includes("all") && bid.status === "pending" && (
                <Button onClick={() => performAction(bid._id, bid.gigId)}>
                  {loading ? "Hiring..." : "Hire Freelancer"}
                </Button>
              )}

              {bid.status === "hired" && (
                <Badge className="bg-green-600">🎉 Hired</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListBids;
