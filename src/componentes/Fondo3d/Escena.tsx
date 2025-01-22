import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const Escena = () => {
  const modelRef = useRef<THREE.Group>(null)
  const { scene: logo } = useGLTF('/public/logosolo3.glb')

  useFrame((_state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <primitive 
        ref={modelRef}
        object={logo} 
        scale={100} // Ajusta según el tamaño de tu modelo
        position={[3, -1.5, 0]} // Ajusta según necesites
      />
    </>
  )
}