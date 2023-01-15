import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-color">
      <div className="social-media">
        <h3 id="Contact">Gostaria de contribuir? entre em contato.</h3>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://api.whatsapp.com/send?phone=5521935007997&text=Olá, me interessei pelo seu trabalho, gostaria de contribuir, segue prompt e @:"
            >
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
      <footer>
        Desenvolvido por<b> Alrion Tech&copy;</b>
      </footer>
    </div>
  );
}

export default Footer;
