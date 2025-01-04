import React from 'react'

export const Home: React.FC = () => {
  return (
    <section className="home">
      <div className="home-content">
        <h1>Bienvenido a mi proyecto 3d</h1>
        <p className="subtitle">Explorá la página</p>
        <div className="scroll-indicator">
          <p>Scroll para ver</p>
          <div className="arrow-down"></div>
        </div>
      </div>
    </section>
  )
}