import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Textarea.css";

const TextArea = ({
  text: initialText,
  id,
  titulo,
  categoria,
  complexidade,
  autor,
  github
}) => {
  // Regular expression to find placeholders like [placeholder, ex: default]
  const getPlaceholders = (txt) => {
    if (!txt) return [];
    const regex = /\[([^\]]+)\]/g;
    const matches = [];
    let match;
    while ((match = regex.exec(txt)) !== null) {
      if (!matches.includes(match[0])) {
        matches.push(match[0]);
      }
    }
    return matches;
  };

  const placeholders = getPlaceholders(initialText);

  // Synchronously initialize variables state to prevent double render cycles
  const [variables, setVariables] = useState(() => {
    const vars = {};
    placeholders.forEach((placeholder) => {
      const content = placeholder.slice(1, -1);
      const exMatch = content.match(/ex:\s*([^\]]+)/i);
      vars[placeholder] = exMatch ? exMatch[1].trim() : "";
    });
    return vars;
  });

  const [selectedAI, setSelectedAI] = useState("padrao");
  const [copied, setCopied] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const textareaRef = useRef(null);

  // Compute optimized text based on selected AI
  const getOptimizedText = (baseText, ai) => {
    switch (ai) {
      case "chatgpt":
        return `${baseText}\n\n[Diretrizes do ChatGPT]:\n- Evite introduções genéricas (ex: 'Claro, posso ajudar...').\n- Divida a resposta em etapas lógicas e use blocos markdown estruturados.\n- Pense passo a passo.`;
      case "gemini":
        return `${baseText}\n\n[Diretrizes do Gemini]:\n- Organize as informações usando listas de marcadores, títulos e tabelas comparativas.\n- Seja detalhista, analítico e forneça exemplos práticos.`;
      case "claude":
        return `Aja de acordo com a persona e diretrizes especificadas abaixo:\n\n<contexto_e_instrucoes>\n${baseText}\n</contexto_e_instrucoes>\n\n[Diretrizes do Claude]:\n- Pense de forma detalhada e lógica antes de começar a responder.\n- Mantenha um tom profissional, preciso e extremamente detalhado.`;
      case "copilot":
        return `${baseText}\n\n[Diretrizes do Copilot]:\n- Responda de forma curta, objetiva e focada em produtividade.\n- Priorize exemplos de código rápidos e explicações diretas ao ponto.`;
      default:
        return baseText;
    }
  };

  // Synchronously initialize text state using default placeholder values
  const [text, setText] = useState(() => {
    let resolved = initialText;
    placeholders.forEach((p) => {
      const content = p.slice(1, -1);
      const exMatch = content.match(/ex:\s*([^\]]+)/i);
      const val = exMatch ? exMatch[1].trim() : p;
      resolved = resolved.replaceAll(p, val);
    });
    return resolved;
  });

  // Re-resolve text when variables or selected AI changes
  useEffect(() => {
    let resolved = initialText;
    placeholders.forEach((p) => {
      const val = variables[p] !== undefined && variables[p] !== "" ? variables[p] : p;
      resolved = resolved.replaceAll(p, val);
    });

    setText(getOptimizedText(resolved, selectedAI));
  }, [initialText, variables, selectedAI]);

  // Dynamically adjust textarea height based on content size to prevent scrolling on cards
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  // Handle changes in variable inputs
  const handleVariableChange = (placeholder, value) => {
    setVariables((prev) => ({ ...prev, [placeholder]: value }));
  };

  // Dynamic button text
  const getCopyBtnText = () => {
    if (selectedAI === "padrao") return "Copiar Prompt";
    return `Copiar para ${selectedAI === "chatgpt" ? "ChatGPT" : selectedAI.charAt(0).toUpperCase() + selectedAI.slice(1)}`;
  };

  // Clipboard copy and dispatch history event
  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const copyText = textareaRef.current;
        copyText.select();
        document.execCommand("copy");
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Dispatch copy history event to update projects history
      const historyEvent = new CustomEvent("prompt_copied", {
        detail: {
          id: id,
          titulo: titulo,
          categoria: categoria,
          complexidade: complexidade,
          autor: autor,
          github: github,
          texto: text
        }
      });
      window.dispatchEvent(historyEvent);
    } catch (err) {
      console.error("Erro ao copiar prompt: ", err);
    }
  };

  const charCount = text ? text.length : 0;
  const tokenEstimate = Math.ceil(charCount / 4);

  return (
    <div className="textarea-config-container">
      {placeholders.length > 0 && (
        <div className="variables-section">
          <p className="variables-title">Personalize as variáveis do prompt:</p>
          <div className="variables-grid">
            {placeholders.map((p, index) => {
              const rawLabel = p.slice(1, -1).split(",")[0].trim();
              const label = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1);
              return (
                <div key={index} className="variable-field">
                  <label>{label}</label>
                  <input
                    type="text"
                    value={variables[p] || ""}
                    onChange={(e) => handleVariableChange(p, e.target.value)}
                    placeholder={`Digite ${label.toLowerCase()}...`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Optimizer Select tabs */}
      <div className="ai-optimizer-section">
        <span className="optimizer-label">Otimizar para IA:</span>
        <div className="optimizer-tabs">
          {["padrao", "chatgpt", "gemini", "claude", "copilot"].map((ai) => (
            <button
              key={ai}
              onClick={() => setSelectedAI(ai)}
              className={`optimizer-tab-btn ${selectedAI === ai ? "active" : ""}`}
            >
              {ai === "padrao" ? "Padrão" : ai.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="textarea-wrapper">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={textareaRef}
          rows="1"
          style={{ overflowY: "hidden" }}
        ></textarea>

        <div className="textarea-info-row">
          <span className="char-token-counter">
            <strong>{charCount}</strong> caracteres • ~<strong>{tokenEstimate}</strong> tokens
          </span>
        </div>

        <div className="textarea-actions-row">
          {/* Focus Mode Toggle Button */}
          <button
            className="focus-mode-btn"
            onClick={() => setFocusMode(true)}
            title="Abrir em Modo Foco (Tela Cheia)"
            aria-label="Abrir em Modo Foco"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "6px" }}
            >
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            Modo Foco
          </button>

          <button
            onClick={handleCopy}
            className={`copy-button ${copied ? "copied" : ""}`}
          >
            {copied ? (
              <>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="btn-icon"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Copiado!
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="btn-icon"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                {getCopyBtnText()}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Focus Mode Fullscreen Modal rendered via React Portal at body level */}
      {focusMode && createPortal(
        <div className="focus-modal-overlay">
          <div className="focus-modal-card">
            <button
              className="focus-modal-close-btn"
              onClick={() => setFocusMode(false)}
              aria-label="Fechar Modo Foco"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="focus-modal-header">
              <span className="focus-modal-subtitle">{categoria} • {complexidade.toUpperCase()}</span>
              <h2 className="focus-modal-title">{titulo}</h2>
            </div>

            <div className="focus-modal-content">
              {placeholders.length > 0 && (
                <div className="focus-left-panel">
                  <h4 className="panel-title">Variáveis do Prompt</h4>
                  <div className="variables-grid">
                    {placeholders.map((p, index) => {
                      const rawLabel = p.slice(1, -1).split(",")[0].trim();
                      const label = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1);
                      return (
                        <div key={index} className="variable-field">
                          <label>{label}</label>
                          <input
                            type="text"
                            value={variables[p] || ""}
                            onChange={(e) => handleVariableChange(p, e.target.value)}
                            placeholder={`Digite ${label.toLowerCase()}...`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="focus-right-panel">
                <div className="focus-ai-select-row">
                  <span className="optimizer-label">Otimizar para IA:</span>
                  <div className="optimizer-tabs">
                    {["padrao", "chatgpt", "gemini", "claude", "copilot"].map((ai) => (
                      <button
                        key={ai}
                        onClick={() => setSelectedAI(ai)}
                        className={`optimizer-tab-btn ${selectedAI === ai ? "active" : ""}`}
                      >
                        {ai === "padrao" ? "Padrão" : ai.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="focus-textarea-wrapper" style={{ display: "flex", flexDirection: "column", flex: 1, position: "relative" }}>
                  <textarea
                    className="focus-textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows="12"
                    style={{ flex: 1 }}
                  ></textarea>
                  <div className="textarea-info-row" style={{ marginTop: "5px", marginBottom: "0" }}>
                    <span className="char-token-counter">
                      <strong>{charCount}</strong> caracteres • ~<strong>{tokenEstimate}</strong> tokens
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="focus-modal-footer">
              <button className="focus-close-action-btn" onClick={() => setFocusMode(false)}>
                Fechar Editor
              </button>
              <button
                onClick={handleCopy}
                className={`copy-button ${copied ? "copied" : ""}`}
              >
                {copied ? (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copiado!
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    {getCopyBtnText()}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default TextArea;
