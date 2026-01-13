import z from "zod";

export const bidSchema = z.object({
  message: z.string().min(1, "Description is Required"),
  price: z.number().min(1, "Budget is requierd "),
});

export type bidform = z.infer<typeof bidSchema>;
