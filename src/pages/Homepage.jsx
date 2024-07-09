import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

function Homepage() {
  const { loggedInUser } = useAuth();
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-6">
      <Card className="max-w-4xl w-full mx-auto bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <CardHeader className="text-center py-6 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
          <h1 className="text-5xl font-bold">Welcome to NoteVerse</h1>
          <p className="text-xl mt-2">Your Ultimate Note-Taking App</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <p className="text-lg mb-4">
              NoteVerse helps you capture and organize your thoughts, manage
              your tasks, and stay productive. Whether you’re taking notes in
              class, jotting down meeting points, or planning your day,
              NoteVerse has the tools you need.
            </p>
            <Link
              to={loggedInUser ? "/myTasks" : "/auth/register"}
              className="inline-block px-6 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:bg-[hsl(var(--primary))]/90 transition duration-300 ease-in-out"
            >
              Get Started
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[hsl(var(--muted))] p-6 rounded-lg shadow-sm ">
              <h2 className="text-2xl font-semibold mb-4 text-[hsl(var(--muted-foreground))]">
                Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-[hsl(var(--muted-foreground))]">
                <li>Organize your notes effortlessly</li>
                <li>Create and track your to-do lists</li>
                <li>Access your notes from any device</li>
                <li>Secure and personalized user experience</li>
              </ul>
            </div>
            <div className="bg-[hsl(var(--accent))] p-6 rounded-lg shadow-sm transition-transform transform hover:scale-105 duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold mb-4 text-[hsl(var(--accent-foreground))]">
                Why Choose NoteVerse?
              </h2>
              <p className="text-[hsl(var(--accent-foreground))] mb-4">
                NoteVerse provides a seamless and intuitive note-taking
                experience designed to boost your productivity and organization.
                With powerful features and a user-friendly interface, NoteVerse
                is the perfect companion for all your note-taking needs.
              </p>
              <p className="text-[hsl(var(--accent-foreground))]">
                Join our community and start organizing your life with NoteVerse
                today!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Homepage;
