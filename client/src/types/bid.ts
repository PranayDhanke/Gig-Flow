export interface Bid {
  _id: string;
  gigId: string;
  message: string;
  status: "pending" | "hired" | "rejected";
  price: number;
  freelancer: {
    _id: string;
    name: string;
  };
}
