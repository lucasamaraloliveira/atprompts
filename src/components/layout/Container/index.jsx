import React from "react";
import "./Container.css";
import GIF_IA from "../../../assets/ia.gif";
import Projects from "./Projects";

function Container() {
  return (
    <div className="container">
      <div className="container-img">
        {/* Modern Interactive Theme-Aware SVG Logo */}
        <svg className="logo-align" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#818cf8" />
              <stop offset="100%" stop-color="#4f46e5" />
            </linearGradient>
          </defs>
          
          {/* Glowing outer frame with theme-based styling */}
          <rect x="6" y="6" width="88" height="88" rx="24" stroke="url(#logo-grad)" stroke-width="6" />
          
          {/* Terminal prompt character >_ inside the logo */}
          <path
            d="M30,36 L48,50 L30,64"
            stroke="var(--text-primary)"
            stroke-width="7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <line
            x1="56"
            y1="64"
            x2="74"
            y2="64"
            stroke="var(--text-primary)"
            stroke-width="7"
            stroke-linecap="round"
          />

          {/* AI Magic Sparkle using theme accent color */}
          <path
            d="M72,20 C72,24 75,27 79,27 C75,27 72,30 72,34 C72,30 69,27 65,27 C69,27 72,24 72,20 Z"
            fill="var(--accent-color)"
          />
        </svg>

        <h2 id="About">ATPrompts</h2>
        <p>
          O <b>ATPrompts</b> foi projetado para elevar a sua experiência na engenharia e uso de prompts de Inteligência Artificial. Com apenas alguns
          cliques, você pode editar variáveis e copiar os prompts de acordo com suas necessidades específicas. O nosso botão de <b>cópia</b> transfere o prompt
          exatamente como você o personalizou, poupando tempo e garantindo respostas de altíssima qualidade.
        </p>

        <img className="gif" src={GIF_IA} alt="" />

        <h2>Compatibilidade Multimodal</h2>
        <p>
          Os prompts disponíveis no <b>ATPrompts</b> são universais e otimizados para funcionar em qualquer Inteligência Artificial generativa do mercado. 
          Use-os para instruir modelos e chatbots como o <b>ChatGPT</b> da OpenAI, o <b>Gemini</b> do Google, o <b>Claude</b> da Anthropic, o <b>Copilot</b> da Microsoft e outros modelos de linguagem (LLMs). 
          Ao alimentar as IAs com instruções detalhadas e estruturadas, você as direciona para agir em papéis específicos, melhorando drasticamente a precisão, coesão e utilidade das respostas obtidas.
        </p>
        <p className="ai-links">
          Acesse suas ferramentas favoritas:{" "}
          <a href="https://chatgpt.com" target="_blank" rel="noreferrer"><b>ChatGPT</b></a> |{" "}
          <a href="https://gemini.google.com" target="_blank" rel="noreferrer"><b>Gemini</b></a> |{" "}
          <a href="https://claude.ai" target="_blank" rel="noreferrer"><b>Claude</b></a> |{" "}
          <a href="https://copilot.microsoft.com" target="_blank" rel="noreferrer"><b>Copilot</b></a>
        </p>

        <Projects />
      </div>
    </div>
  );
}

export default Container;
