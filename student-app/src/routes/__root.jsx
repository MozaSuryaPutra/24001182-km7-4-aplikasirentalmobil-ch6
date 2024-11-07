import styled from "styled-components";
import React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import NavigationBar from "../components/NavBar/index.jsx";
import Sidebar from "../components/SideBar/index.jsx";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: row;
  overflow-x: hidden; /* Prevent horizontal scroll */
  background-color: #ecf0f1;
`;

const SidebarContainer = styled.div`
  width: 80px;
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  background-color: #fff;
  z-index: 2;

  @media (max-width: 992px) {
    display: none; /* Hide sidebar on mobile */
  }
`;

const NavbarContainer = styled.div`
  width: calc(100% - 80px); // Full width minus sidebar width
  position: fixed;
  top: 0;
  left: 80px; // Adjust for sidebar
  background-color: #fff;
  z-index: 3; // Ensure it's above sidebar
  transition: left 0.3s ease;

  @media (max-width: 992px) {
    width: 100%;
    left: 0; // Remove sidebar offset on mobile
  }
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 80px;
  height: 100%;
  position: relative;
  overflow-x: hidden; /* Prevent horizontal scroll */

  @media (min-width: 992px) {
    /* 992px is typically for 'large' screens (e.g., desktop) */
    margin-left: 260px; /* Ensure content shifts right by sidebar width */
  }

  @media (max-width: 992px) {
    margin-left: 10px;
  }
`;

const ContentContainer = styled(Container).attrs({
  fluid: true,
})`
  flex: 1;
  overflow-y: auto;
  padding: 0;
  background-color: #ecf0f1;
  display: flex;
  flex-direction: column;
  margin-top: 60px; /* Offset content below the fixed navbar */
  height: calc(100vh - 60px); /* Ensure content fills the rest of the height */
  transition: margin-left 0.3s ease;
  overflow-x: hidden; /* Prevent horizontal scroll */
  box-sizing: border-box; /* Ensure padding and border are within width */
`;

export const Route = createRootRoute({
  component: () => {
    return (
      <LayoutContainer>
        {/* Sidebar */}
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>

        {/* Main Content Area */}
        <MainContentWrapper>
          <div style={{ position: "relative" }}>
            <NavbarContainer>
              <NavigationBar />
            </NavbarContainer>
            <ContentContainer>
              <Outlet />
            </ContentContainer>
          </div>
        </MainContentWrapper>

        {/* Debugging router */}
        <TanStackRouterDevtools style={{ zIndex: 4 }} />

        {/* React Toastify */}
        <ToastContainer theme="colored" style={{ zIndex: 5 }} />
      </LayoutContainer>
    );
  },
});
