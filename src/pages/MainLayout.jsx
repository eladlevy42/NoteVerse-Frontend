import NavBar from "@/components/NavBar";
import { Outdent } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      {" "}
      <NavBar /> <Outlet />
    </>
  );
}

export default MainLayout;
