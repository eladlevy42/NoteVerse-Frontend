import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
function MainLayout() {
  return (
    <>
      <NavBar />
      <Toaster />
      <Outlet />
    </>
  );
}

export default MainLayout;
