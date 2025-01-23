import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="footer" style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
      <div className="footer-content">
        <p>© 2024 Your Company. All rights reserved.</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="#Linkedin">Linkedin</a>
          <a href="#Github">Github</a>
          <a href="#Instagram">Instagram</a>
        </div>
      </div>
    </footer>
  )
}