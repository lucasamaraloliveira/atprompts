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
      
      <button onClick={toggleMenu}>
        <span><img className='icon' src={Hamburguer} alt="" /> </span>
      </button>
      {menuOpen && (
        <ul>
          <a href="#"><li>Lucas Amaral</li></a>
          <a href="#Project"><li>Projetos </li></a>
          <a href="#Contact"><li>Contato</li></a>
        </ul>
      )}
    </div>
  );
}

export default HamburgerMenu;