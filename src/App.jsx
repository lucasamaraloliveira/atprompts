import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
import Footer from './components/layout/Footer'
import HamburgerMenu from './components/layout/Navbar/HamburgerMenu'




function App() {
  return (
    <div>
      <Navbar/>
      <HamburgerMenu/>
      <Container/>
      <Footer/>
    </div> 
  
  )
}

export default App
