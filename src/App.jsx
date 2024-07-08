import React from "react";
import Register from "./pages/Register";
import Login from "./pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Homepage from "./pages/Homepage";
import MyTasks from "./pages/MyTasks";
import MainLayout from "./pages/MainLayout";
import CreateTask from "./pages/CreateTask";
import NoteDetails from "./pages/NoteDetails";

// ProtectedRoute to guard authenticated routes
function ProtectedRoute({ children }) {
  const { loggedInUser } = useAuth();
  console.log("loggedInUser", loggedInUser);

  if (loggedInUser === undefined) {
    return null;
  }
  if (loggedInUser === null) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}

// UserLoggedInRoute to redirect already logged-in users
function UserLoggedInRoute({ children }) {
  const { loggedInUser } = useAuth();
  if (loggedInUser === undefined) {
    return null;
  }
  if (loggedInUser !== null) {
    return <Navigate to="/" />;
  }
  return children;
}

// Main App component with routing
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route
          path="/myTasks"
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          }
        >
          <Route
            path="create"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <NoteDetails />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/auth">
          <Route
            path="login"
            element={
              <UserLoggedInRoute>
                <Login />
              </UserLoggedInRoute>
            }
          />
          <Route
            path="register"
            element={
              <UserLoggedInRoute>
                <Register />
              </UserLoggedInRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
