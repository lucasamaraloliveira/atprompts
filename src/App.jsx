import Navbar from "./components/layout/Navbar";
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import HamburgerMenu from "./components/layout/Navbar/HamburgerMenu";
import React, { useRef, useState, useEffect } from "react";

import Arrow from "./assets/arrow.png";

function App() {
  const topRef = useRef(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [showModal, setShowModal] = useState(false);
  const [modalData] = useState({
    id: "update_1100_prompts",
    tipo: "inclusao", // "inclusao" ou "edicao"
    titulo: "Novos Prompts Adicionados!",
    mensagem: "Adicionamos um banco gigantesco de prompts de Inteligência Artificial para otimizar seu fluxo de trabalho em desenvolvimento, design e marketing.",
    detalhes: "Total de 1100 prompts agora disponíveis com paginação inteligente de 10 por página!"
  });

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const seenModalId = localStorage.getItem("atprompts_last_modal_seen");
    if (seenModalId !== modalData.id) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [modalData.id]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem("atprompts_last_modal_seen", modalData.id);
  };

  const handleClick = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <button className="top-button " onClick={handleClick}>
        <img className="btn-topo" src={Arrow} alt="" />
      </button>
      <div ref={topRef}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <HamburgerMenu theme={theme} toggleTheme={toggleTheme} />
        <Container />
        <Footer />
      </div>

      {/* Global Interactive News Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className={`modal-card ${modalData.tipo}`}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Fechar novidades">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="modal-header">
              <span className={`modal-badge ${modalData.tipo}`}>
                {modalData.tipo === "inclusao" ? "NOVA INCLUSÃO" : "EDIÇÃO"}
              </span>
              <h3 className="modal-title">{modalData.titulo}</h3>
            </div>
            <div className="modal-body">
              <p className="modal-msg">{modalData.mensagem}</p>
              {modalData.detalhes && <p className="modal-details">{modalData.detalhes}</p>}
            </div>
            <div className="modal-footer">
              <button className="modal-action-btn" onClick={closeModal}>
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
