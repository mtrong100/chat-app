import React from "react";
import { useAuth } from "../context/auth-context";
import { Outlet, Navigate } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const MainLayout = () => {
  const { currentUser } = useAuth();

  return (
    <main className="grid grid-cols-[450px_minmax(0,_1fr)_400px]  relative h-screen overflow-hidden">
      <LeftSidebar />
      {currentUser ? <Outlet /> : <Navigate to="/sign-in" />}
      <RightSidebar />
    </main>
  );
};

export default MainLayout;
