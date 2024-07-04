import React, { useState } from "react";
import { Link } from "react-router-dom";
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

function Register() {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (ev) => {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const email = form.get("email");
    const username = form.get("username");
    const password = form.get("password");

    register({ firstName, lastName, email, username, password });
  };

  return (
    <Card className="w-64 self-center m-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input placeholder="First Name" name="firstName" required />
          <Input placeholder="Last Name" name="lastName" required />
          <Input type="email" placeholder="Email" name="email" required />
          <Input placeholder="Username" name="username" required />
          <div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
            />
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>
          <Button type="submit">Register</Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 underline">
            Log In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default Register;
