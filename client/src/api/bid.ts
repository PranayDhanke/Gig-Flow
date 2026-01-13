import type { Bid } from "@/types/bid";
import api from "./axios";

export const CreateBid = async (data: Partial<Bid>) => {
  const res = await api.post("/bid/create-bid", data);
  return res;
};

export const GetBids = async (id: string) => {
  const res = await api.get(`/bid/get-bid-gig/${id}`);
  return res;
};

export const GetMyBids = async (id: string) => {
  const res = await api.get(`/bid/get-bid/${id}`);
  return res;
};

export const HireFreelancer = async (bidId: string) => {
  const res = await api.patch(`/bid/hire-freelancer/${bidId}`);
  return res;
};
