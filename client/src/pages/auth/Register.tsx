import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import { registerUser } from "@/redux/Features/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema, type registerForm } from "@/types/register.z";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";

const Register = () => {
  const [searchParam] = useSearchParams();
  const dispatch = useAppDispatch();

  const role = searchParam.get("role") || "";

  const { isLoading, error } = useSelector((state: any) => state.auth);

  const form = useForm<registerForm>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = (data: registerForm) => {
    dispatch(
      registerUser({
        email: data.email,
        name: data.name,
        password: data.password,
        role: role,
      })
    );
  };
  return (
    <Card className="w-full max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Create Your Account and be a part of our platfrom
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      placeholder="Entre your Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Entre your Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Entre your password"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting" : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription>Alredy Have Account ?</CardDescription>
        <CardAction>
          <Link to={"/login"}>
            <Button variant={"link"}>Login</Button>
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default Register;
