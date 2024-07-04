import React from "react";
import Register from "./pages/Register";
import Login from "./pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Homepage from "./pages/Homepage";
import MyTasks from "./pages/MyTasks";
import MainLayout from "./pages/MainLayout";

function ProtectedRoute({ children }) {
  const { loggedInUser } = useAuth();

  if (loggedInUser === null) {
    console.log(null);
    return <Navigate to="/auth/login" />;
  }

  return children;
}

function UserLoggedInRoute({ children }) {
  const { loggedInUser } = useAuth();
  if (loggedInUser !== null) {
    return <Navigate to="/" />;
  }

  return children;
}
function App() {
  return (
    <Routes>
      {" "}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Homepage />} />
        <Route path="/myTasks" element={<MyTasks />} />
      </Route>{" "}
      <Route path="/auth" element={<UserLoggedInRoute></UserLoggedInRoute>}>
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
