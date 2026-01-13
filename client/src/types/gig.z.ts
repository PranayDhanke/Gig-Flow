import z from "zod";

export const gigSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is Required"),
  budget: z.number().min(1, "Budget is requierd "),
});

export type gigform = z.infer<typeof gigSchema>;
