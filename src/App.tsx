//import React from 'react'
import { Navbar } from './componentes/Navbar/navbar'
import { Home } from './Home/Home'
import { HorizontalScroll } from './componentes/HorizontalScroll/HorizontalScroll'
import { Contact } from './componentes/Contacto/Contacto'
import { Footer } from './componentes/Footer/Footer'
import { Fondo3D } from './componentes/Fondo3d/Fondo3d'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Estilos/global.css'



function App() {
  return (
    <div className="app">
      <Fondo3D />
      <Navbar />
      <Home />
      <HorizontalScroll />
      <Contact />
      <Footer />
    </div>
  )
}

export default App