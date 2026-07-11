import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";

function Navbar({ theme, toggleTheme }) {
  const menuLinks = useRef(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasNewNotif, setHasNewNotif] = useState(
    localStorage.getItem("atprompts_notif_seen") !== "true"
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    menuLinks.current = document.querySelectorAll(".menu-smoothie");
    menuLinks.current.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionId = e.target.getAttribute("href");
        if (sectionId === "#" || !sectionId) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          const targetElement = document.querySelector(sectionId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      });
    });

    // Close notifications if clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotifClick = () => {
    setNotifOpen(!notifOpen);
    setHasNewNotif(false);
    localStorage.setItem("atprompts_notif_seen", "true");
  };

  return (
    <div className="navbar">
      <ul className="nav-menu">
        <li>
          <a className="menu-smoothie" href="#">
            Início
          </a>
        </li>
        <li>
          <a className="menu-smoothie" href="#About">
            Sobre
          </a>
        </li>
        <li>
          <a className="menu-smoothie" href="#Prompts">
            Prompts
          </a>
        </li>
      </ul>

      <div className="nav-actions">
        {/* Notification Bell Dropdown */}
        <div className="notif-wrapper" ref={dropdownRef}>
          <button
            className={`theme-toggle notif-btn ${hasNewNotif ? "unread" : ""}`}
            onClick={handleNotifClick}
            aria-label="Notificações"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {hasNewNotif && <span className="notif-badge"></span>}
          </button>

          {notifOpen && (
            <div className="notif-dropdown">
              <h4 className="notif-title">Novidades</h4>
              <div className="notif-content">
                <div className="notif-item">
                  <span className="notif-tag">NOVO</span>
                  <span className="notif-date">11 de Julho de 2026</span>
                  <p className="notif-text">
                    🚀 <strong>Super Expansão de Prompts!</strong> Adicionamos um banco gigantesco de <strong>1100 prompts</strong> profissionais. 
                    Também implementamos <strong>paginação</strong> de 10 prompts por página para uma navegação muito mais rápida e fluida!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Switcher */}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Alterar tema">
          {theme === "dark" ? (
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
