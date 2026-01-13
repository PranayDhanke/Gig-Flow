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
import { createBid } from "@/redux/Features/bidSlices";
import { useAppDispatch } from "@/redux/hooks";
import { bidSchema, type bidform } from "@/types/bid.z";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CreateBid = () => {
  const { gigId } = useParams<{ gigId: string }>();

  const disptch = useAppDispatch();

  const navigate = useNavigate();

  const { loading } = useSelector((state: any) => state.bid);
  const { user } = useSelector((state: any) => state.auth);

  const form = useForm<bidform>({
    resolver: zodResolver(bidSchema),
  });

  const submitForm = (data: bidform) => {
    disptch(
      createBid({
        message: data.message,
        price: data.price,
        status: "pending",
        freelancer: {
          _id: user._id,
          name: user.name,
        },
        gigId: gigId,
      })
    );
    toast.success("Gig Added Successfully");
    navigate("/dashboard");
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle>Create New Bid</CardTitle>
        <CardDescription>Entre message and price to post Bid</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(submitForm)}
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Entre your Message"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    placeholder="Entre your Price"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Submit" : "adding bid"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateBid;
