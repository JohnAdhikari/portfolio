import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useThemeColors from '../../hooks/useThemeColors';
import useReducedMotion from '../../hooks/useReducedMotion';

// A small rotating low-poly object rendered per project card. Different shapes
// per icon so each project reads visually. Painted in the paper palette.

function Shape({ name, color, accent }) {
  const mesh = useRef(null);
  const reduced = useReducedMotion();
  const kind = shapeFor(name);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    if (reduced) return;
    mesh.current.rotation.y += delta * 0.6;
    mesh.current.rotation.x += delta * 0.18;
  });

  const props = { color, wireframe: true, flatShading: true };
  const solid = { color: accent, flatShading: true };

  return (
    <group ref={mesh} scale={1.15}>
      {kind === 'box' && (
        <mesh>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshStandardMaterial {...props} />
        </mesh>
      )}
      {kind === 'sphere' && (
        <mesh>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial {...props} />
        </mesh>
      )}
      {kind === 'octa' && (
        <mesh>
          <octahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial {...solid} />
        </mesh>
      )}
      {kind === 'pyramid' && (
        <mesh>
          <coneGeometry args={[0.8, 1, 4]} />
          <meshStandardMaterial {...props} />
        </mesh>
      )}
      {kind === 'torus' && (
        <mesh>
          <torusGeometry args={[0.65, 0.22, 12, 32]} />
          <meshStandardMaterial {...props} />
        </mesh>
      )}
      {kind === 'cone' && (
        <mesh>
          <coneGeometry args={[0.7, 1.1, 6]} />
          <meshStandardMaterial {...props} />
        </mesh>
      )}
      {kind === 'message' && (
        <mesh>
          <boxGeometry args={[1, 0.7, 0.18]} />
          <meshStandardMaterial {...props} />
        </mesh>
      )}
    </group>
  );
}

function shapeFor(name) {
  switch (name) {
    case 'cart':
      return 'box';
    case 'chat':
    case 'chat-bubble':
      return 'message';
    case 'chip':
    case 'bot':
    case 'network':
      return 'octa';
    case 'map':
      return 'pyramid';
    case 'antenna':
    case 'share':
      return 'torus';
    default:
      return 'sphere';
  }
}

function Scene({ name }) {
  const { colors } = useThemeColors();
  const color = useMemo(() => new THREE.Color(colors.line || '#1a1a1a'), [colors]);
  const accent = useMemo(() => new THREE.Color(colors['accent-hi'] || '#b08d5f'), [colors]);
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 4]} intensity={1.1} />
      <Shape name={name} color={color} accent={accent} />
    </>
  );
}

export default function ProjectIcon3D({ name }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene name={name} />
      </Suspense>
    </Canvas>
  );
}