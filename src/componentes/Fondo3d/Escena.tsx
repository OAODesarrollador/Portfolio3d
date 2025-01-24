import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export const Escena = () => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene: logo } = useGLTF('/logosolo3.glb');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      // Altura total del documento menos la altura de la ventana
      //const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Altura de la ventana para identificar el inicio de cada sección
      const sectionHeight = window.innerHeight;

      // Cálculo del índice de la sección actual
      const currentSectionIndex = Math.floor(scrollY / sectionHeight);

      // Detectar si estamos cerca del inicio de la próxima sección (cuando ocupa toda la pantalla)
      const progressInSection = (scrollY % sectionHeight) / sectionHeight;

      // Definir posiciones por sección: derecha, izquierda, derecha...
      const positions = [4, -4, 4]; // Repetir patrón

      // Determinar posición inicial y final basadas en la sección actual
      const startX = positions[currentSectionIndex % positions.length];
      const endX = positions[(currentSectionIndex + 1) % positions.length];

      // Movimiento progresivo basado en el progreso dentro de la sección
      const targetX =
        progressInSection >= 1 // Si hemos alcanzado la próxima sección, saltar a su posición
          ? endX
          : THREE.MathUtils.lerp(startX, endX, progressInSection);

      // Movimiento suave hacia la posición objetivo
      modelRef.current.position.x += (targetX - modelRef.current.position.x) * 0.1;

      // Rotación constante sobre el eje Y
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <primitive
        ref={modelRef}
        object={logo}
        scale={90}
        position={[4, -1, 0]} // Posición inicial ajustada al lado derecho
      />
    </>
  );
};
