import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const username = form.get("username");
    const password = form.get("password");
    login({ username, password });
  }

  return (
    <main className="p-4 bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen">
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6">
        <Card className="w-full max-w-sm bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-xl shadow-lg overflow-hidden ">
          <CardHeader>
            <CardTitle>Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <Input
                placeholder="username"
                name="username"
                required
                className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-gray-300 rounded-md p-2"
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                required
                className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-gray-300 rounded-md p-2"
              />
              <label className="flex items-center gap-2 mt-2 text-[hsl(var(--foreground))]">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="form-checkbox"
                />
                Show Password
              </label>
              <Button
                type="submit"
                className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
              >
                Log In
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-[hsl(var(--primary))] underline"
              >
                Join here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default Login;
