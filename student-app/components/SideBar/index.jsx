import React, { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { FaCar, FaHome, FaCogs, FaWrench } from "react-icons/fa";

const SideBar = () => {
  const [isCarsOpen, setIsCarsOpen] = useState(false); // Toggle for Cars nested items
  const [isModelsOpen, setIsModelsOpen] = useState(false); // Toggle for Models nested items
  const [isTypesOpen, setIsTypesOpen] = useState(false); // Toggle for Types nested items
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

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
              onClick={() => {
                setIsCarsOpen(false); // Close Cars menu
                setIsModelsOpen(false); // Close Models menu
                setIsTypesOpen(false); // Close Types menu
              }}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "10px 0",
                color: "#fff",
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
            <button
              onClick={() => {
                setIsCarsOpen(!isCarsOpen);
                setIsModelsOpen(false); // Close Model menu if open
                setIsTypesOpen(false); // Close Types menu if open
              }}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "10px 0",
                color: isCarsOpen ? "#0D28A6" : "#fff",
                backgroundColor: isCarsOpen ? "#D9EFFF" : "transparent",
                borderRadius: "8px",
                border: "none",
                textAlign: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <FaCar size={24} />
              <span>Cars</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setIsModelsOpen(!isModelsOpen);
                setIsCarsOpen(false); // Close Cars menu if open
                setIsTypesOpen(false); // Close Types menu if open
              }}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "10px 0",
                color: isModelsOpen ? "#0D28A6" : "#fff",
                backgroundColor: isModelsOpen ? "#D9EFFF" : "transparent",
                borderRadius: "8px",
                border: "none",
                textAlign: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <FaCogs size={24} />
              <span>Models</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setIsTypesOpen(!isTypesOpen);
                setIsCarsOpen(false); // Close Cars menu if open
                setIsModelsOpen(false); // Close Models menu if open
              }}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "10px 0",
                color: isTypesOpen ? "#0D28A6" : "#fff",
                backgroundColor: isTypesOpen ? "#D9EFFF" : "transparent",
                borderRadius: "8px",
                border: "none",
                textAlign: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <FaWrench size={24} />
              <span>Types</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Nested Sidebar for Cars */}
      {isCarsOpen && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "80px", // Position next to the main sidebar
            width: "180px", // Width of nested sidebar
            backgroundColor: "#fff",
            padding: "20px",
            height: "100vh", // Full height
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ color: "#6C757D", fontWeight: "bold" }}>CARS</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link
                to="/cars"
                style={{
                  display: "block",
                  padding: "10px",
                  color: isActive("/cars") ? "#0D28A6" : "#333",
                  backgroundColor: isActive("/cars")
                    ? "#D9EFFF"
                    : "transparent",
                  borderRadius: "8px",
                  textDecoration: "none",
                  width: "100%", // Stretch to full width
                }}
              >
                List Car
              </Link>
            </li>
            <li>
              <Link
                to="/cars/create"
                style={{
                  display: "block",
                  padding: "10px",
                  color: isActive("/cars/create") ? "#0D28A6" : "#333",
                  backgroundColor: isActive("/cars/create")
                    ? "#D9EFFF"
                    : "transparent",
                  borderRadius: "8px",
                  textDecoration: "none",
                  width: "100%", // Stretch to full width
                }}
              >
                Add New Car
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Nested Sidebar for Models */}
      {isModelsOpen && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "80px", // Position next to the main sidebar
            width: "180px", // Width of nested sidebar
            backgroundColor: "#fff",
            padding: "20px",
            height: "100vh", // Full height
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ color: "#6C757D", fontWeight: "bold" }}>MODELS</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link
                to="/models"
                style={{
                  display: "block",
                  padding: "10px",
                  color: isActive("/models") ? "#0D28A6" : "#333",
                  backgroundColor: isActive("/models")
                    ? "#D9EFFF"
                    : "transparent",
                  borderRadius: "8px",
                  textDecoration: "none",
                  width: "100%", // Stretch to full width
                }}
              >
                List Models
              </Link>
            </li>
            <li>
              <Link
                to="/models/create"
                style={{
                  display: "block",
                  padding: "10px",
                  color: isActive("/models/create") ? "#0D28A6" : "#333",
                  backgroundColor: isActive("/models/create")
                    ? "#D9EFFF"
                    : "transparent",
                  borderRadius: "8px",
                  textDecoration: "none",
                  width: "100%", // Stretch to full width
                }}
              >
                Add New Model
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Nested Sidebar for Types */}
      {isTypesOpen && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "80px", // Position next to the main sidebar
            width: "180px", // Width of nested sidebar
            backgroundColor: "#fff",
            padding: "20px",
            height: "100vh", // Full height
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ color: "#6C757D", fontWeight: "bold" }}>TYPES</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link
                to="/types"
                style={{
                  display: "block",
                  padding: "10px",
                  color: isActive("/types") ? "#0D28A6" : "#333",
                  backgroundColor: isActive("/types")
                    ? "#D9EFFF"
                    : "transparent",
                  borderRadius: "8px",
                  textDecoration: "none",
                  width: "100%", // Stretch to full width
                }}
              >
                List Types
              </Link>
            </li>
            <li>
              <Link
                to="/types/create"
                style={{
                  display: "block",
                  padding: "10px",
                  color: isActive("/types/create") ? "#0D28A6" : "#333",
                  backgroundColor: isActive("/types/create")
                    ? "#D9EFFF"
                    : "transparent",
                  borderRadius: "8px",
                  textDecoration: "none",
                  width: "100%", // Stretch to full width
                }}
              >
                Add New Type
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;
