import React, { useEffect, useRef } from "react";
import "./Navbar.css";

function Navbar() {
  const menuLinks = useRef(null);

  useEffect(() => {
    menuLinks.current = document.querySelectorAll(".menu-smoothie");
    menuLinks.current.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionId = e.target.getAttribute("href");
        document.querySelector(sectionId).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }, []);

  return (
    <div className="navbar">
      <ul>
        <li>
          <a className="menu-smoothie" href="#">
            {" "}
            Início
          </a>
        </li>
        <li>
          <a className="menu-smoothie" href="#About">
            {" "}
            Sobre
          </a>
        </li>
        <li>
          <a className="menu-smoothie" href="#Prompts">
            {" "}
            Prompts
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
