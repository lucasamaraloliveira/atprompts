import React, { useState } from 'react';
import './HamburgerMenu.css'
import Hamburguer from '../../../../assets/hamburger.png'

function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    
    <div className='menu-hamburguer'>
      
      <button className='menu-hamburguer-btn' onClick={toggleMenu}>
        <span><img className='icon' src={Hamburguer} alt="" /> </span>
      </button>
      {menuOpen && (
        <ul>
          <a href="#"><li>Início</li></a>
          <a href="#About"><li>Sobre </li></a>
          <a href="#Prompts"><li>Prompts</li></a>
        </ul>
      )}
    </div>
  );
}

export default HamburgerMenu;