import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useThemeColors from '../../hooks/useThemeColors';
import useReducedMotion from '../../hooks/useReducedMotion';

// A subtle 3D particle field fixed behind every section. Particles slowly
// orbit and drift upward as the page scrolls. Painted in the accent palette
// so it reads as "pencil dust" rather than neon.

const COUNT = 260;

function buildPositions(count) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 22;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  return arr;
}

const POSITIONS = buildPositions(COUNT);

function Particles({ color }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const scroll = useRef({ value: 0 });

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    scroll.current.value = window.scrollY || 0;
    // Scroll awareness: ease the whole field toward a height-derived offset.
    const target = state.viewport.height * 0.5 - scroll.current.value * 0.02;
    g.position.y += (target - g.position.y) * Math.min(delta * 1.2, 1);
    if (!reduced) {
      g.rotation.y += delta * 0.012;
    }
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={color} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function ParticleField() {
  const reduced = useReducedMotion();
  const { colors, dark } = useThemeColors();

  const color = useMemo(
    () => (dark ? new THREE.Color(colors['accent-hi'] || '#dcc396') : new THREE.Color(colors.violet || '#9a8fbf')),
    [colors, dark],
  );

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Particles color={color} />
        </Suspense>
      </Canvas>
    </div>
  );
}