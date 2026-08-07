import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useThemeColors from '../../hooks/useThemeColors';
import useReducedMotion from '../../hooks/useReducedMotion';

// Constellation: nodes orbiting a core like a hand-drawn atom. Each skill ring
// sits on a different tilt so the constellation reads as layered + alive.

function Ring({ radius, tiltX, tiltZ, count, color }) {
  const spin = useRef(null);

  // Precompute node offsets once (no per-frame allocation).
  const offsets = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      arr.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return arr;
  }, [count, radius]);

  useFrame((state) => {
    if (spin.current) spin.current.rotation.y = state.clock.elapsedTime * 0.18 * (count % 2 === 0 ? 1 : -1);
  });

  return (
    <group ref={spin} rotation={[tiltX, 0, tiltZ]}>
      <mesh>
        <torusGeometry args={[radius, 0.004, 6, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      {offsets.map((pos, i) => (
        <mesh key={i} position={pos}>
          <dodecahedronGeometry args={[0.09, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} flatShading />
        </mesh>
      ))}
    </group>
  );
}

const RING_DEFS = [
  { radius: 1.55, tiltX: 0.4, tiltZ: 0.0, nodes: 7 },
  { radius: 2.4, tiltX: -0.7, tiltZ: 0.5, nodes: 9 },
];

function Scene() {
  const { colors } = useThemeColors();
  const core = useMemo(() => new THREE.Color(colors['accent-hi'] || '#b08d5f'), [colors]);
  const violet = useMemo(() => new THREE.Color(colors.violet || '#9a8fbf'), [colors]);
  const cyan = useMemo(() => new THREE.Color(colors.cyan || '#7fa8a0'), [colors]);

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 4, 4]} intensity={1.1} />
      <mesh>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial color={core} wireframe flatShading emissive={core} emissiveIntensity={0.3} />
      </mesh>
      <Ring {...RING_DEFS[0]} color={violet} />
      <Ring {...RING_DEFS[1]} color={cyan} />
    </>
  );
}

export default function SkillsOrbit({ position = [0, 0, 5.6] }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position, fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}