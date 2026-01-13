export interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  status: "open" | "assigned";
  postedBy: {
    _id: string;
    name: string;
  };
}
