import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const Escena = () => {
  const modelRef = useRef<THREE.Group>(null)
  const { scene: logo } = useGLTF('/public/logosolo3.glb')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(({ viewport }) => {
    if (modelRef.current) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollY / maxScroll

      // Posicionamiento dinámico basado en el viewport
      const rightEdge = viewport.width / 4  // Ajuste fino del borde derecho

      // Cálculo de movimiento más preciso
      const horizontalRange = 8
      const oscillationFactor = Math.sin(scrollProgress * Math.PI) 
      const targetX = rightEdge - (horizontalRange * oscillationFactor)

      // Interpolación suave con amortiguación ajustada
      modelRef.current.position.x = THREE.MathUtils.lerp(
        modelRef.current.position.x, 
        targetX, 
        0.01
      )

      // Rotación más suave
      modelRef.current.rotation.y += 0.01
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <primitive
        ref={modelRef}
        object={logo}
        scale={90}
        position={[0, -1, 0]} // Ajuste de posición inicial
      />
    </>
  )
}