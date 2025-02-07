import { Canvas } from '@react-three/fiber'
import { Escena } from './Escena'

export const Fondo3D = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 0]}}>
        <Escena />
      </Canvas>
    </div>
  )
}