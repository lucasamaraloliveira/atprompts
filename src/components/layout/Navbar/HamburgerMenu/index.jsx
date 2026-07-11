import React, { useState, useEffect, useRef } from "react";
import "./HamburgerMenu.css";

function HamburgerMenu({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasNewNotif, setHasNewNotif] = useState(
    localStorage.getItem("atprompts_notif_seen") !== "true"
  );
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleItemClick = () => {
    setMenuOpen(false);
  };

  const handleNotifClick = () => {
    setNotifOpen(!notifOpen);
    setHasNewNotif(false);
    localStorage.setItem("atprompts_notif_seen", "true");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`menu-hamburguer ${menuOpen ? "open" : ""}`}>
      <div className="menu-hamburguer-header">
        <button className="menu-hamburguer-btn" onClick={toggleMenu} aria-label="Menu de navegação">
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            stroke="var(--text-primary)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hamburger-icon-svg"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        <div className="menu-hamburguer-actions">
          {/* Mobile Notifications Bell */}
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
              <div className="notif-dropdown mobile-dropdown">
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

          {/* Theme switcher */}
          <button className="theme-toggle mobile-toggle" onClick={toggleTheme} aria-label="Alterar tema">
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
