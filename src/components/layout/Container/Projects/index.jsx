import React, { useState, useEffect } from "react";
import TextArea from "../../../Textarea";
import promptsData from "../../../../data/prompts.json";
import "./Projects.css";

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedComplexity, setSelectedComplexity] = useState("Todos");
  const [favorites, setFavorites] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sharedId, setSharedId] = useState(null);
  
  // State for single-prompt shared view
  const [sharedPromptId, setSharedPromptId] = useState(null);

  const promptsPerPage = 10;

  // Load favorites and history from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("atprompts_favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Erro ao carregar favoritos:", e);
      }
    }

    const savedHistory = localStorage.getItem("atprompts_history");
    if (savedHistory) {
      try {
        setHistoryList(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Erro ao carregar histórico:", e);
      }
    }
  }, []);

  // Listen to prompt copy events to update history dynamically
  useEffect(() => {
    const handleCopied = (e) => {
      const copiedItem = e.detail;
      setHistoryList((prev) => {
        const filtered = prev.filter((item) => item.id !== copiedItem.id);
        const updated = [copiedItem, ...filtered].slice(0, 10);
        localStorage.setItem("atprompts_history", JSON.stringify(updated));
        return updated;
      });
    };
    window.addEventListener("prompt_copied", handleCopied);
    return () => window.removeEventListener("prompt_copied", handleCopied);
  }, []);

  // Read URL query parameters for direct prompt link sharing
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const promptIdParam = urlParams.get("prompt");
    if (promptIdParam) {
      const promptId = parseInt(promptIdParam);
      const exists = promptsData.some((p) => p.id === promptId);
      if (exists) {
        setSharedPromptId(promptId);
      }
    }
  }, []);

  // Reset page to 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedComplexity]);

  // Save favorites to localStorage
  const toggleFavorite = (id) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("atprompts_favorites", JSON.stringify(updated));
  };

  // Handle link sharing copies
  const handleShare = async (id) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?prompt=${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setSharedId(id);
      setTimeout(() => setSharedId(null), 2000);
    } catch (err) {
      console.error("Erro ao copiar link de compartilhamento:", err);
    }
  };

  // Return from isolated prompt view to main dashboard
  const handleClearSharedView = () => {
    setSharedPromptId(null);
    // Remove ?prompt=ID from URL without page reload
    window.history.pushState({}, "", window.location.pathname);
  };

  // If a prompt ID is shared in URL, render the isolated focused view
  if (sharedPromptId !== null) {
    const sharedPrompt = promptsData.find((p) => p.id === sharedPromptId);
    
    if (sharedPrompt) {
      return (
        <div className="prompts-section shared-isolated-view">
          <div className="isolated-header">
            <button className="back-to-dashboard-btn" onClick={handleClearSharedView}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ marginRight: "8px" }}>
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Ver todos os 1000 prompts
            </button>
            <span className="isolated-badge">PROMPT COMPARTILHADO</span>
          </div>

          <div className="prompts-grid single-card-grid">
            <div className="prompt-card highlighted">
              <div className="prompt-card-header">
                <h3 className="prompt-card-title">{sharedPrompt.titulo}</h3>
                <div className="card-actions">
                  <button
                    className={`share-btn ${sharedId === sharedPrompt.id ? "shared" : ""}`}
                    onClick={() => handleShare(sharedPrompt.id)}
                    title="Copiar link de compartilhamento"
                  >
                    {sharedId === sharedPrompt.id ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--success-color)" strokeWidth="3" fill="none">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    )}
                  </button>

                  <button
                    className={`favorite-btn ${favorites.includes(sharedPrompt.id) ? "is-fav" : ""}`}
                    onClick={() => toggleFavorite(sharedPrompt.id)}
                    title={favorites.includes(sharedPrompt.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill={favorites.includes(sharedPrompt.id) ? "var(--accent-color)" : "none"} stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="prompt-meta">
                <span className="meta-badge category-badge">{sharedPrompt.categoria}</span>
                <span className={`meta-badge complexity-badge ${sharedPrompt.complexidade}`}>
                  {sharedPrompt.complexidade.toUpperCase()}
                </span>
                <span className="meta-author">
                  Contribuição:{" "}
                  <a href={sharedPrompt.github} target="_blank" rel="noopener noreferrer">
                    {sharedPrompt.autor}
                  </a>
                </span>
              </div>

              <TextArea
                text={sharedPrompt.texto}
                id={sharedPrompt.id}
                titulo={sharedPrompt.titulo}
                categoria={sharedPrompt.categoria}
                complexidade={sharedPrompt.complexidade}
                autor={sharedPrompt.autor}
                github={sharedPrompt.github}
              />
            </div>
          </div>

          <div className="isolated-footer-note">
            <p>Precisa de mais opções? O <strong>ATPrompts</strong> possui um banco de dados completo com 1000 prompts gratuitos.</p>
            <button className="explore-all-btn" onClick={handleClearSharedView}>
              Explorar Banco de Prompts
            </button>
          </div>
        </div>
      );
    }
  }

  // Get unique categories from prompts data (excluding user actions)
  const categories = [
    "Todos",
    ...new Set(promptsData.map((p) => p.categoria)),
  ];
  const complexities = ["Todos", "baixa", "média", "alta"];

  // Filter prompts (using history list if selectedCategory is Histórico)
  const baseList = selectedCategory === "Histórico" ? historyList : promptsData;

  const filteredPrompts = baseList.filter((prompt) => {
    const matchesSearch =
      prompt.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.texto.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos"
        ? true
        : selectedCategory === "Favoritos"
        ? favorites.includes(prompt.id)
        : selectedCategory === "Histórico"
        ? true // already filtered by baseList assignment
        : prompt.categoria === selectedCategory;

    const matchesComplexity =
      selectedComplexity === "Todos" ? true : prompt.complexidade === selectedComplexity;

    return matchesSearch && matchesCategory && matchesComplexity;
  });

  // Pagination logic
  const totalPrompts = filteredPrompts.length;
  const totalPages = Math.ceil(totalPrompts / promptsPerPage);
  const startIndex = (currentPage - 1) * promptsPerPage;
  const paginatedPrompts = filteredPrompts.slice(startIndex, startIndex + promptsPerPage);

  // Advanced pagination logic: sliding window of 5 pages
  const getPageRange = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const [gotoPageVal, setGotoPageVal] = useState("");

  const handleGotoPage = () => {
    const pageNum = parseInt(gotoPageVal);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setGotoPageVal("");
    }
  };

  return (
    <div className="prompts-section">
      <h2 id="Prompts" className="prompts-main-title">
        Explorar Prompts
      </h2>

      <div className="prompts-count">
        Encontrados <strong>{totalPrompts}</strong> {totalPrompts === 1 ? "prompt" : "prompts"} de um total de{" "}
        <strong>{baseList.length}</strong> {selectedCategory === "Histórico" ? "no histórico" : "cadastrados"}
      </div>

      {/* Filter and Search Panel */}
      <div className="filters-panel">
        <div className="search-wrapper">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Pesquisar prompts por título ou conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* User Collections Row (Favorites & History) */}
        <div className="filter-group user-collection-group">
          <span className="filter-label">Sua Coleção:</span>
          <div className="chips-container">
            <button
              className={`chip-btn collection-chip ${selectedCategory === "Favoritos" ? "active" : ""}`}
              onClick={() => setSelectedCategory("Favoritos")}
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill={selectedCategory === "Favoritos" ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: "6px" }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Favoritos ({favorites.length})
            </button>
            <button
              className={`chip-btn collection-chip ${selectedCategory === "Histórico" ? "active" : ""}`}
              onClick={() => setSelectedCategory("Histórico")}
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "6px" }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Histórico ({historyList.length})
            </button>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="filter-group categories-group">
          <span className="filter-label">Categorias:</span>
          <div className="chips-container">
            {categories.map((category) => (
              <button
                key={category}
                className={`chip-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Chips */}
        <div className="filter-group">
          <span className="filter-label">Complexidade:</span>
          <div className="chips-container">
            {complexities.map((comp) => (
              <button
                key={comp}
                className={`chip-btn comp-btn ${selectedComplexity === comp ? "active" : ""} ${comp}`}
                onClick={() => setSelectedComplexity(comp)}
              >
                {comp.charAt(0).toUpperCase() + comp.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prompts list */}
      <div className="prompts-grid">
        {paginatedPrompts.length > 0 ? (
          paginatedPrompts.map((prompt) => (
            <div key={prompt.id} id={`prompt-card-${prompt.id}`} className="prompt-card">
              <div className="prompt-card-header">
                <h3 className="prompt-card-title">{prompt.titulo}</h3>
                <div className="card-actions">
                  {/* Share Link Button */}
                  <button
                    className={`share-btn ${sharedId === prompt.id ? "shared" : ""}`}
                    onClick={() => handleShare(prompt.id)}
                    title="Copiar link de compartilhamento"
                  >
                    {sharedId === prompt.id ? (
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        stroke="var(--success-color)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    )}
                  </button>

                  {/* Favorite Button */}
                  <button
                    className={`favorite-btn ${favorites.includes(prompt.id) ? "is-fav" : ""}`}
                    onClick={() => toggleFavorite(prompt.id)}
                    title={favorites.includes(prompt.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill={favorites.includes(prompt.id) ? "var(--accent-color)" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="prompt-meta">
                <span className="meta-badge category-badge">{prompt.categoria}</span>
                <span className={`meta-badge complexity-badge ${prompt.complexidade}`}>
                  {prompt.complexidade.toUpperCase()}
                </span>
                <span className="meta-author">
                  Contribuição:{" "}
                  <a href={prompt.github} target="_blank" rel="noopener noreferrer">
                    {prompt.autor}
                  </a>
                </span>
              </div>

              <TextArea
                text={prompt.texto}
                id={prompt.id}
                titulo={prompt.titulo}
                categoria={prompt.categoria}
                complexidade={prompt.complexidade}
                autor={prompt.autor}
                github={prompt.github}
              />
            </div>
          ))
        ) : (
          <div className="empty-state">
            <svg
              viewBox="0 0 24 24"
              width="48"
              height="48"
              stroke="var(--text-muted)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <p>Nenhum prompt encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>

      {/* Optimized Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <div className="pagination-container">
            {/* Quick First page arrow */}
            <button
              className="pagination-btn arrow-btn"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              title="Primeira página"
            >
              &laquo;
            </button>

            {/* Previous page arrow */}
            <button
              className="pagination-btn arrow-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              title="Anterior"
            >
              &lsaquo;
            </button>

            {/* Sliding window of 5 pages */}
            <div className="pagination-numbers">
              {getPageRange().map((page) => (
                <button
                  key={page}
                  className={`pagination-btn num-btn ${currentPage === page ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next page arrow */}
            <button
              className="pagination-btn arrow-btn"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              title="Próxima"
            >
              &rsaquo;
            </button>

            {/* Quick Last page arrow */}
            <button
              className="pagination-btn arrow-btn"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              title="Última página"
            >
              &raquo;
            </button>
          </div>

          {/* Go to Page Input Field */}
          <div className="pagination-goto">
            <span>Ir para:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={gotoPageVal}
              onChange={(e) => setGotoPageVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGotoPage();
              }}
              placeholder="Pág"
              className="goto-input"
            />
            <span className="goto-total">de {totalPages}</span>
            <button onClick={handleGotoPage} className="goto-btn">Ir</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;