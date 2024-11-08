import React, { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { FaCar, FaHome, FaCogs, FaWrench } from "react-icons/fa";
import { useSelector } from "react-redux";

const SideBar = () => {
  const location = useLocation();

  // Access the token from Redux store
  const token = useSelector((state) => state.auth.token); // Adjust the path based on your store

  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust for your mobile breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize state on first render

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  // If there is no token or it’s a mobile view, return null (don't render the sidebar)
  if (!token || isMobile) {
    return null;
  }

  return (
    <div style={{ display: "flex" }}>
      {/* Main Sidebar */}
      <div
        style={{
          background: "#0D28A6", // Sidebar background color
          width: "80px", // Increased width for icons
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "fixed", // Fixed positioning
          height: "100vh", // Full height
          color: "#fff", // Text color
          zIndex: "3",
        }}
      >
        {/* White Square instead of "Main" text */}
        <div
          style={{
            backgroundColor: "#fff",
            width: "30px", // Set the size of the square
            height: "30px", // Set the size of the square
            margin: "20px 0", // Margin to space out from the top
          }}
        ></div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "10px 0",
                color: isActive("/") ? "#0D28A6" : "#fff", // Active state color
                backgroundColor: isActive("/") ? "#D9EFFF" : "transparent", // Active state background
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
                textDecoration: "none", // Remove underline
                cursor: "pointer",
              }}
            >
              <FaHome size={24} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/cars"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "10px 0",
                color: isActive("/cars") ? "#0D28A6" : "#fff", // Active state color
                backgroundColor: isActive("/cars") ? "#D9EFFF" : "transparent", // Active state background
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
                textDecoration: "none", // Remove underline
                cursor: "pointer",
              }}
            >
              <FaCar size={24} />
              <span>Cars</span>
            </Link>
          </li>
          <li>
            <Link
              to="/models"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "10px 0",
                color: isActive("/models") ? "#0D28A6" : "#fff", // Active state color
                backgroundColor: isActive("/models")
                  ? "#D9EFFF"
                  : "transparent", // Active state background
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
                textDecoration: "none", // Remove underline
                cursor: "pointer",
              }}
            >
              <FaCogs size={24} />
              <span>Models</span>
            </Link>
          </li>
          <li>
            <Link
              to="/types"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "10px 0",
                color: isActive("/types") ? "#0D28A6" : "#fff", // Active state color
                backgroundColor: isActive("/types") ? "#D9EFFF" : "transparent", // Active state background
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
                textDecoration: "none", // Remove underline
                cursor: "pointer",
              }}
            >
              <FaWrench size={24} />
              <span>Types</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
