import React from "react";
import "./Container.css";
import IA from "../../../assets/ia.svg";
import GIF_IA from "../../../assets/ia.gif";
import Projects from "./Projects";


function Container() {
  return (
    <div className="container">
      <div className="container-img">
        <img className="teste" src={IA} alt="ia" />
        <h2 id="About">ATPrompts</h2>
        <p>
          <b>ATPrompts</b> foi projetado para melhorar a experiência do usuário
          ao lidar com prompts, com apenas alguns cliques você pode facilmente
          editar e copiar os prompts no site de acordo com suas necessidades e
          preferências específicas, e o botão de <b>cópia</b> copiará o prompt
          exatamente como você o editou.
        </p>
        <img className="gif" src={GIF_IA} alt="" />
        
        <Projects />
      </div>
    </div>
  );
}

export default Container;
