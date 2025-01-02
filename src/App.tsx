//import React from 'react'
import { Navbar } from './componentes/Navbar/navbar'
import { HorizontalScroll } from './componentes/HorizontalScroll/HorizontalScroll'
import { Contact } from './componentes/Contacto/Contacto'
import { Footer } from './componentes/Footer/Footer'
import { Background3D } from './componentes/Fondo3d/Fondo3d'
import './Estilos/global.css'

function App() {
  return (
    <div className="App">
      <Background3D />
      <Navbar />
      <HorizontalScroll />
      <Contact />
      <Footer />
    </div>
  )
}

export default App