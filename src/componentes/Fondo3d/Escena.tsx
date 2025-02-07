import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export const Escena = () => {
  const { camera } = useThree(); // Accede a la cámara
  const modelRef = useRef<THREE.Group>(null);
  
  const { scene: logo } = useGLTF('/robot3d.glb');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      const sectionHeight = window.innerHeight;
      const currentSectionIndex = Math.floor(scrollY / sectionHeight);
      const progressInSection = (scrollY % sectionHeight) / sectionHeight;

      // Posiciones alternas (derecha, izquierda, derecha...)
      const positions = [4, -4, 4];
      const startX = positions[currentSectionIndex % positions.length];
      const endX = positions[(currentSectionIndex + 1) % positions.length];

      // Escalas alternas (pequeño, grande, pequeño...)
      const scales = [3, 5, 3];
      const startScale = scales[currentSectionIndex % scales.length];
      console.log(startScale, scales.length, currentSectionIndex)
      const endScale = scales[(currentSectionIndex + 1) % scales.length];
      console.log(endScale,  scales.length, currentSectionIndex)
      // Interpolación suave de posición
      const targetX = THREE.MathUtils.lerp(startX, endX, progressInSection);
      modelRef.current.position.x += (targetX - modelRef.current.position.x) * 0.01;

      // Interpolación suave de escala
      const targetScale = THREE.MathUtils.lerp(startScale, endScale, progressInSection);
      modelRef.current.scale.set(targetScale, targetScale, targetScale);

      // Rotación constante
      //modelRef.current.rotation.y += 0.005;
      const cameraTargetZ = 3 + progressInSection * 6; // Ajuste de profundidad
      camera.position.z += (cameraTargetZ - camera.position.z) * 0.005;
     
      const cameraTargetY = 1.5 - progressInSection * 1.2; // Ajuste de altura
      camera.position.y += (cameraTargetY - camera.position.y) * 0.01;
      
      camera.lookAt(modelRef.current.position);

    }
  });

  return (
    <> 
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 15]} intensity={0.5} />
      <primitive 
        ref={modelRef}
        object={logo}
        scale={90}
        position={[4, -1, 0]} 
        rotation={[0, -0.3, 0]}
      />
    </> 
  );
};
