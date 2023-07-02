import React, { useState } from "react";
import "./logout.css";
import { useNavigate } from "react-router";

const CircleInitials = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <div className="circle" onClick={toggleDropdown}>
        HP
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="arrow"></div>
          <ul>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CircleInitials;
