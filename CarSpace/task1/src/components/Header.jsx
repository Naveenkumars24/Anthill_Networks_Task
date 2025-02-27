import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleNavClick = (item) => {
    if (item === "Certified Pre-Owned") {
      navigate("/usedcar"); // Redirects to Used Cars page
    }
    if (item==="Home"){
      navigate("/usedcar");
    }
  };

  const handleBookCarClick = () => {
      navigate("/MyCars"); // Redirects to Used Cars page
  };

  return (
    <header className="header">
      {/* Logo */}
      <h1 className="logo">Carspace</h1>

      {/* Navigation */}
      <nav className="nav">
      {["Home", "About us", "Certified Pre-Owned"].map((item, index) => (
        <a 
          key={index} 
          href="#" 
          className="nav-link" 
          onClick={(e) => {
            e.preventDefault(); // Prevents default anchor behavior
            handleNavClick(item);
          }}
        >
          {item}
        </a>
      ))}
    </nav>

      {/* Compare Button & Profile */}
      <div className="right-section">
        <button className="compare-button" onClick={handleBookCarClick}>My Cars</button>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKwu24bi0nBtgdzIKRC-Xl-TOoaE3ML5sSAQ&s"
          alt="Profile"
          className="profile-img"
        />
      </div>
    </header>
  );
};

export default Header;
