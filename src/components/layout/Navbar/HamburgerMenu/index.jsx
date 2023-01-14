import React, { useState } from "react";
import "./HamburgerMenu.css";
import Hamburguer from "../../../../assets/cardapio.png";

function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleItemClick = () => {
    toggleMenu();
  };

  return (
    <div className={`menu-hamburguer ${menuOpen ? "open" : ""}`}>
      <button className="menu-hamburguer-btn" onClick={toggleMenu}>
        <span>
          <img className="icon" src={Hamburguer} alt="" />{" "}
        </span>
      </button>
      <ul>
        <a href="#" onClick={handleItemClick}>
          <li>Início</li>
        </a>
        <a href="#About" onClick={handleItemClick}>
          <li>Sobre </li>
        </a>
        <a href="#Prompts" onClick={handleItemClick}>
          <li>Prompts</li>
        </a>
      </ul>
    </div>
  );
}

export default HamburgerMenu;
