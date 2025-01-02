import React from 'react'

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between' }}>
        <div className="logo">Logo</div>
        <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
          <a href="#home">Home</a>
          <a href="#about">Acerca</a>
          <a href="#contact">Contacto</a>
        </div>
      </div>
    </nav>
  )
}