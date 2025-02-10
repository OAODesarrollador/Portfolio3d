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
      const positions = [4, -5, 4];
      const startX = positions[currentSectionIndex % positions.length];
      
      const endX = positions[(currentSectionIndex + 1) % positions.length];

      // Escalas alternas (pequeño, grande, pequeño...)
      //const scales = [3, 3 , 3];
      //const startScale = scales[currentSectionIndex % scales.length];
      
      //const endScale = scales[(currentSectionIndex + 1) % scales.length];
      
      
      // Interpolación suave de posición
      
      const targetX = THREE.MathUtils.lerp(startX, endX, progressInSection);
      
      
      modelRef.current.position.x += (targetX - modelRef.current.position.x) * 0.02;
      
      //  escala

      modelRef.current.scale.set(3, 3, 3);
      const cameraTargetZ = 6 + progressInSection * 3; // Ajuste de profundidad
      camera.position.z += (cameraTargetZ - camera.position.z) * 0.01;
      
      
      //const cameraTargetY = 1.5 + progressInSection * 1.1; // Ajuste de altura
      //camera.position.y += (cameraTargetY - camera.position.y) * 0.01;
      //camera.position.y = 1.1 ;
      
      //camera.lookAt(modelRef.current.position);
      //console.log(modelRef.current.rotation.y);
      
      // Rotacion que funciona

      //if (currentSectionIndex % 2 === 1 && modelRef.current.rotation.y <= 4.9 && modelRef.current.rotation.y > 1.2) { // Si estamos en la sección impar y la rotación es menor que 4.8> 4.81 && modelRef.current.rotation.y > 1.5) {
      //  modelRef.current.rotation.y -= 0.05;
      //  console.log("==1",modelRef.current.rotation.y);
      //} if ( currentSectionIndex % 2 !== 1 && modelRef.current.rotation.y <= 4.8 && modelRef.current.rotation.y >= 1.10) { // Si estamos en la sección par y la rotación es mayor que -4.8
      //  modelRef.current.rotation.y += 0.05;
      //  console.log(">< 1",modelRef.current.rotation.y);
      //}
      
      if (currentSectionIndex % 2 === 1 && modelRef.current.rotation.y <= 0.55 && modelRef.current.rotation.y >= -1.56) { // Si estamos en la sección impar y la rotación es menor que 4.8> 4.81 && modelRef.current.rotation.y > 1.5) {
          modelRef.current.rotation.y += 0.01;
          console.log("==1",(modelRef.current.rotation.y*10));
          console.log("currentSectionIndex: ",currentSectionIndex);
        } if ( currentSectionIndex % 2 !== 1 && modelRef.current.rotation.y <= 0.56 && modelRef.current.rotation.y >= -1.50) { // Si estamos en la sección par y la rotación es mayor que -4.8
          modelRef.current.rotation.y -= 0.01;
          console.log(">< 1: ",modelRef.current.rotation.y);
          console.log("currentSectionIndex: ",currentSectionIndex);
      }
    }
  });

  return (
    <> 
      <ambientLight intensity={0.9} />
      <directionalLight position={[1, 1, 100]} intensity={0.5} />
      <primitive 
        ref={modelRef}
        object={logo}
        scale={80}
        position={[0,0.5, 0]} 
        rotation={[0, -1.5, 0.09]}
      />
    </> 
  );
};
