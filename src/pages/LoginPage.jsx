import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  function handleLogin(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const username = form.get("username");
    const password = form.get("password");
    login({ username, password });
  }
  return (
    <>
      <Card className=" w-52 self-center m-auto">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className=" flex-col flex gap-1">
            <Input placeholder="username" name="username" required />
            <Input
              type="password"
              placeholder="password"
              name="password"
              required
            />
            <Button type="submit">Log In</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-500 underline">
              Join here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}

export default Login;
