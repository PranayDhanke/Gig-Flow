import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createGig } from "@/redux/Features/gigSlices";
import { useAppDispatch } from "@/redux/hooks";
import { gigSchema, type gigform } from "@/types/gig.z";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateGig = () => {
  const disptch = useAppDispatch();

  const navigate = useNavigate();

  const { isloading } = useSelector((state: any) => state.gig);
  const { user, checkAuth, isLoading } = useSelector(
    (state: any) => state.auth
  );

  const form = useForm<gigform>({
    resolver: zodResolver(gigSchema),
  });

  const submitForm = (data: gigform) => {
    if (!user) return;

    disptch(
      createGig({
        title: data.title,
        description: data.description,
        budget: data.budget,
        postedBy: {
          _id: user._id,
          name: user.name,
        },
        status: "open",
      })
    );

    toast.success("Gig Added Successfully");
    navigate("/dashboard");
  };

  if (!checkAuth || isLoading) {
    return <div className="mt-20 text-center">Loading...</div>;
  }

  if (!user) {
    return null; // or <Navigate to="/login" />
  }

  return (
    <Card className="w-full max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle>Create New Gig</CardTitle>
        <CardDescription>
          Entre title , description and Budget to post new Gig
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(submitForm)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Entre your Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              {...form}
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <Input
                    type="number"
                    placeholder="Entre your Budget"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    placeholder="Entre your Description"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isloading}>
              {isloading ? "Creating" : "Create gig"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateGig;
