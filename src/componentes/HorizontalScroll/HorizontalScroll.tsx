import React, { useRef, useEffect, useState } from 'react'
import { Section } from './Seccion'
import './HorizontalScroll.css'

export const HorizontalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLastSection, setIsLastSection] = useState(false)
  const lastScrollTop = useRef(0)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const handleScroll = () => {
      if (!element) return
      
      const isAtEnd = Math.abs(
        element.scrollWidth - element.scrollLeft - element.clientWidth
      ) < 10
      
      setIsLastSection(isAtEnd)
    }

    const handleWheel = (e: WheelEvent) => {
      if (!element) return

      const sectionWidth = window.innerWidth
      const currentScroll = element.scrollLeft
      const maxScroll = element.scrollWidth - element.clientWidth
      
      // Detectar dirección del scroll
      const scrollingUp = e.deltaY < 0

      // Obtener elemento de contacto
      const contactSection = document.querySelector('.contact')
      if (!contactSection) return

      // Obtener la posición actual de scroll vertical
      const windowScrollY = window.scrollY
      const contactTop = contactSection.getBoundingClientRect().top + windowScrollY

      // Si estamos en la sección de contacto y scrolleamos hacia arriba
      if (windowScrollY > 0 && scrollingUp) {
        if (windowScrollY <= contactTop) {
          // Volver al scroll horizontal
          window.scrollTo(0, 0)
          element.scrollTo({
            left: maxScroll,
            behavior: 'smooth'
          })
          e.preventDefault()
        }
        return
      }

      // Si estamos en la última sección horizontal y scrolleamos hacia abajo
      if (currentScroll >= maxScroll - 10 && !scrollingUp) {
        return // Permitir scroll vertical
      }

      // Para todo lo demás, manejar scroll horizontal
      e.preventDefault()
      const targetScroll = Math.round(currentScroll / sectionWidth) * sectionWidth

      element.scrollTo({
        left: scrollingUp 
          ? Math.max(targetScroll - sectionWidth, 0)
          : Math.min(targetScroll + sectionWidth, maxScroll),
        behavior: 'smooth'
      })
    }

    // Manejar scroll vertical
    const handleWindowScroll = () => {
      const scrollTop = window.scrollY
      const scrollingUp = scrollTop < lastScrollTop.current
      lastScrollTop.current = scrollTop

      if (scrollingUp && scrollTop === 0) {
        setIsLastSection(true)
      }
    }

    element.addEventListener('scroll', handleScroll)
    element.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleWindowScroll)
    
    return () => {
      element.removeEventListener('scroll', handleScroll)
      element.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleWindowScroll)
    }
  }, [])

  return (
    <div 
      className="scroll-container" 
      ref={containerRef}
      style={{
        overflowY: isLastSection ? 'visible' : 'hidden'
      }}
    >
      <div className="scroll-content">
        <Section title="Section 1" content="Content for section 1" color="#ff6b6b" />
        <Section title="Section 2" content="Content for section 2" color="#4ecdc4" />
        <Section title="Section 3" content="Content for section 3" color="#45b7d1" />
      </div>
    </div>
  )
}