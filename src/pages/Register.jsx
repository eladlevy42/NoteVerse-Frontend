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
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress"; // Import the progress component
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

function Register() {
  const { register, handleGoogleSuccess } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleRegister = (ev) => {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const email = form.get("email");
    const username = form.get("username");
    const password = form.get("password");

    const errorMessage = validatePassword(password);
    if (errorMessage) {
      toast({
        variant: "destructive",
        title: "Password Error",
        description: errorMessage,
      });
      return;
    }

    register({ firstName, lastName, email, username, password });
  };

  const handlePasswordChange = (ev) => {
    const newPassword = ev.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return (strength / 5) * 100;
  };

  const validatePassword = (password) => {
    if (password.length <= 7) {
      return "Password must be longer than 7 characters.";
    }
    if (!/\d/.test(password)) {
      return "Password must include a number.";
    }
    return "";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 20) {
      return "bg-red-500";
    } else if (passwordStrength <= 40) {
      return "bg-orange-500";
    } else if (passwordStrength <= 60) {
      return "bg-yellow-500";
    } else if (passwordStrength <= 80) {
      return "bg-yellow-600";
    } else {
      return "bg-green-500";
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6">
      <Card className="w-full max-w-sm bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-xl shadow-lg overflow-hidden">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <Input
              placeholder="First Name"
              name="firstName"
              required
              className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-gray-300 rounded-md p-2"
            />
            <Input
              placeholder="Last Name"
              name="lastName"
              required
              className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-gray-300 rounded-md p-2"
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              required
              className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-gray-300 rounded-md p-2"
            />
            <Input
              placeholder="Username"
              name="username"
              required
              className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-gray-300 rounded-md p-2"
            />
            <div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                required
                className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-gray-300 rounded-md p-2"
                onChange={handlePasswordChange}
              />
              <label className="flex items-center gap-2 mt-2 text-[hsl(var(--foreground))] mb-2">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="form-checkbox"
                />
                Show Password
              </label>
              <label>Password Strength:</label>
              <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
                <div
                  className={`h-2.5 rounded-full ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
            </div>
            <Button
              type="submit"
              className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
            >
              Register
            </Button>
          </form>{" "}
          <div className=" flex flex-col w-full items-center">
            <p className=" text-center my-2">OR</p>
            <GoogleLogin
              className="w-full self-center"
              onSuccess={async (credentialResponse) => {
                handleGoogleSuccess(credentialResponse);
              }}
              onError={() => {
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description: error.response.data.message,
                });
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-[hsl(var(--primary))] underline"
            >
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Register;
