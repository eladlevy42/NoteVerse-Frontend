import React from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";

import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <CardHeader className="text-center py-4 bg-blue-600 text-white">
          <h1 className="text-4xl font-bold">Welcome to NoteVerse</h1>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg text-gray-700 text-center mb-4">
            Your ultimate note-taking app, similar to Google Keep.
          </p>
          <div className="flex justify-center">
            <Link
              to="/auth/login"
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Homepage;
