import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const Escena = () => {
  const modelRef = useRef<THREE.Group>(null)
  const { scene: logo } = useGLTF('/public/logosolo3.glb')
  const [scrollY, setScrollY] = useState(0)

  // Escucha el evento de scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Actualiza la posición y rotación del modelo
  useFrame(() => {
    if (modelRef.current) {
      // Cálculo del rango de scroll total
      const maxScroll = document.body.scrollHeight - window.innerHeight

      // Progresión normalizada del scroll (0 al 1)
      const scrollProgress = scrollY / maxScroll

      // Movimiento en 3 secciones:
      // 0% -> 33%: Derecha
      // 33% -> 66%: Izquierda
      // 66% -> 100%: Derecha
      let targetX = 0
      if (scrollProgress < 0.30 ) {
        targetX = 4 // Derecha
      } else if (scrollProgress < 0.66) {
        targetX = -4 // Izquierda
      } else {
        targetX = 4 // Derecha
      }

      // Interpolación suave del movimiento horizontal
      modelRef.current.position.x += (targetX - modelRef.current.position.x) * 0.01

      // Rotación constante sobre el eje Y
      modelRef.current.rotation.y += 0.009
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <primitive 
        ref={modelRef}
        object={logo} 
        scale={90} // Ajusta según el tamaño de tu modelo
        position={[3.5, -1, 0]} // Comienza a la derecha
      />
    </>
  )
}
