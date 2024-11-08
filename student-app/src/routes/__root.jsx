import React from "react";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import NavigationBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
 
export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Conditionally show nav and sidebar on all routes except login and register
    const showNavAndSidebar = currentPath !== "/login" && currentPath !== "/register";

    return (
      <>
        {/* Conditionally render Navbar and Sidebar */}
        {showNavAndSidebar && <NavigationBar />}
        {showNavAndSidebar && <Sidebar />}

        {/* Wrap in Container only if not an auth page */}
        {showNavAndSidebar ? (
          <Container>
            <Outlet />
          </Container>
        ) : (
          <Outlet />
        )}

        {/* This is for debugging router */}
        <TanStackRouterDevtools />

        {/* React Toastify */}
        <ToastContainer theme="colored" />
      </>
    )
  },
});