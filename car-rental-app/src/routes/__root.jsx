import React from "react";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import NavigationBar from "../components/NavBar/index.jsx";
import Sidebar from "../components/SideBar/index.jsx";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Navbar */}
      <NavigationBar />

      <Container>
        {/* Outlet is to detect the pathname or url and then render the component by pathname or url */}
        <Outlet />
      </Container>

      {/* This is for debugging router */}
      <TanStackRouterDevtools />

      {/* React Toastify */}
      <ToastContainer theme="colored" />
    </>
  ),
});
