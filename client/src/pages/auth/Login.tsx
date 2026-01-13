import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, type loginForm } from "@/types/login.z";
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
import { loginUser } from "@/redux/Features/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";

const Login = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useSelector((state: any) => state.auth);

  const form = useForm<loginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = (data: loginForm) => {
    dispatch(loginUser(data));
  };
  return (
    <Card className="w-full max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle>Login to Your Account</CardTitle>
        <CardDescription>
          Entre your email and password to login
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
              {isLoading ? "Logging in" : "Log In"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription>Don't Have Account ?</CardDescription>
        <CardAction>
          <Link to={"/register"}>
            <Button variant={"link"}>Register</Button>
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default Login;
