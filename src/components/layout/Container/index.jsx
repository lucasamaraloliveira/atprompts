import React from "react";
import "./Container.css";
import IA from "../../../assets/ia.svg";
import GIF_IA from "../../../assets/ia.gif";
import Projects from "./Projects";

function Container() {
  return (
    <div className="container">
      <div className="container-img">
        <img className="logo-align" src={IA} alt="ia" />
        <h2 id="About">ATPrompts</h2>
        <p>
          <b>ATPrompts</b> foi projetado para melhorar a experiência do usuário
          ao lidar com prompts, com apenas alguns cliques você pode facilmente
          editar e copiar os prompts no site de acordo com suas necessidades e
          preferências específicas, e o botão de <b>cópia</b> copiará o prompt
          exatamente como você o editou.
        </p>
        
        <img className="gif" src={GIF_IA} alt="" />

        <h2>ChatGPT</h2>
        <p>
          Agora que a <b>ATPrompts</b> foi apresentada, é possível utilizar os prompts
          criados para treinar e melhorar o desempenho do seu chatbot baseado no
          ChatGPT. Isso pode ser feito através da adição de exemplos de diálogo
          que são específicos para o seu uso, aumentando a capacidade do chatbot
          de compreender e responder de forma mais precisa. Para obter mais
          informações sobre como utilizar os prompts no ChatGPT, visite{" "}
          <a href="https://chat.openai.com/chat" target="_blank">
            <b>chat.openai.com/chat</b>
          </a>
          .
        </p>

        <Projects />
      </div>
    </div>
  );
}

export default Container;
