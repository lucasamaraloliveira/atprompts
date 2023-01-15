import Navbar from "./components/layout/Navbar";
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import HamburgerMenu from "./components/layout/Navbar/HamburgerMenu";
import React, { useRef } from "react";

import Arrow from "./assets/arrow.png";

function App() {
  const topRef = useRef(null);

  const handleClick = () => {
    topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <button className="top-button " onClick={handleClick}>
        <img className="btn-topo" src={Arrow} alt="" />
      </button>
      <div ref={topRef}>
        <Navbar />
        <HamburgerMenu />
        <Container />
        <Footer />
      </div>
    </div>
  );
}

export default App;
