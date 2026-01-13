import type { Gig } from "@/types/gig";
import api from "./axios";

export const CreateGig = async (data: Partial<Gig>) => {
  const res = await api.post("/gig/create-gig", data);
  return res;
};

export const GetAllGigs = async () => {
  const res = await api.get("/gig/gigs");
  return res;
};

export const GetGig = async (id: string) => {
  const res = await api.get(`/gig/get-gig/${id}`);
  return res;
};

export const GetMyGigs = async (id: string) => {
  const res = await api.get(`/gig/get-my-gigs/${id}`);
  return res;
};
