import React, { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { FaCar, FaHome, FaCogs, FaWrench } from "react-icons/fa";
import { useSelector } from "react-redux";

const SideBar = () => {
  const location = useLocation();

  const token = useSelector((state) => state.auth.token);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  if (!token || isMobile) {
    return null;
  }

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          background: "#0D28A6",
          width: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "fixed",
          height: "100vh",
          color: "#fff",
          zIndex: "3",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            width: "30px",
            height: "30px",
            margin: "20px 0",
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
                color: isActive("/") ? "#0D28A6" : "#fff",
                backgroundColor: isActive("/") ? "#D9EFFF" : "transparent",
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
                textDecoration: "none",
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
                color: isActive("/cars") ? "#0D28A6" : "#fff",
                backgroundColor: isActive("/cars") ? "#D9EFFF" : "transparent",
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
                textDecoration: "none",
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
                color: isActive("/models") ? "#0D28A6" : "#fff",
                backgroundColor: isActive("/models")
                  ? "#D9EFFF"
                  : "transparent",
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
                textDecoration: "none",
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
                color: isActive("/types") ? "#0D28A6" : "#fff",
                backgroundColor: isActive("/types") ? "#D9EFFF" : "transparent",
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
                textDecoration: "none",
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
