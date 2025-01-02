import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="footer" style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
      <div className="footer-content">
        <p>© 2024 Your Company. All rights reserved.</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </div>
      </div>
    </footer>
  )
}