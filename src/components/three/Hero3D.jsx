import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import useThemeColors from '../../hooks/useThemeColors';
import useReducedMotion from '../../hooks/useReducedMotion';
import profileImage from '../../assets/optimized/profileImage.jpg';

// A pencil-sketch planet: circular portrait at the core, two line rings orbiting it.
// True to the "Raw" theme (line-art, ink on paper) rather than neon.
// Interactive: drag to spin, mouse parallax, gentle idle float.

function useCircularMask() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, size / 2 - 2, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.985, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);
}

function Portrait() {
  const { camera } = useThree();
  const portrait = useTexture(profileImage);
  const mask = useCircularMask();
  const ref = useRef(null);
  const q = useMemo(() => new THREE.Quaternion(), []);

  useEffect(() => {
    portrait.colorSpace = THREE.SRGBColorSpace;
    portrait.wrapS = portrait.wrapT = THREE.ClampToEdgeWrapping;
    portrait.needsUpdate = true;
    if (!portrait.image) return;
    const imgAspect = portrait.image.width / portrait.image.height;
    if (imgAspect > 1) {
      portrait.repeat.set(1 / imgAspect, 1);
      portrait.offset.set((1 - portrait.repeat.x) / 2, 0);
    } else {
      portrait.repeat.set(1, imgAspect);
      portrait.offset.set(0, (1 - portrait.repeat.y) / 2);
    }
  }, [portrait]);

  // Billboard: always face the camera regardless of parent drag/float rotation.
  useFrame(() => {
    if (!ref.current) return;
    ref.current.parent.getWorldQuaternion(q).invert();
    ref.current.quaternion.copy(camera.quaternion).premultiply(q);
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial
        map={portrait}
        alphaMap={mask}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Planet({ ringColor }) {
  const group = useRef(null);
  const reduced = useReducedMotion();
  const { pointer } = useThree();

  // Accumulated user-rotation from dragging. Mutated directly, never setState.
  const spin = useRef({ rx: 0.35, ry: 0.1 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  // Idle self-rotation + pointer parallax + apply drag velocity.
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    if (reduced) return;
    const d = Math.min(delta * 2, 1);

    // idle spin
    spin.current.ry += delta * 0.15;

    // parallax toward pointer (only when not dragging)
    if (!dragging.current) {
      g.position.x += (pointer.x * 0.5 - g.position.x) * d;
      g.position.y += (pointer.y * 0.35 - g.position.y) * d;
    }

    // apply accumulated rotation
    g.rotation.x += (spin.current.rx - g.rotation.x) * d;
    g.rotation.y += (spin.current.ry - g.rotation.y) * d;
  });

  const onPointerDown = (e) => {
    e.stopPropagation();
    dragging.current = true;
    last.current.x = e.clientX;
    last.current.y = e.clientY;
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current.x = e.clientX;
    last.current.y = e.clientY;
    spin.current.ry += dx * 0.008;
    spin.current.rx += dy * 0.008;
  };
  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <group
      ref={group}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerLeave={stopDrag}
    >
      {/* portrait core */}
      <Portrait />

      {/* main ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
        <torusGeometry args={[1.55, 0.012, 8, 90]} />
        <meshStandardMaterial color={ringColor} emissive={ringColor} emissiveIntensity={0.25} />
      </mesh>

      {/* wide faint ring */}
      <mesh rotation={[Math.PI / 2.1, 0.2, 0.6]}>
        <torusGeometry args={[1.95, 0.006, 8, 90]} />
        <meshStandardMaterial color={ringColor} transparent opacity={0.4} emissive={ringColor} emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
}

function Scene() {
  const { colors } = useThemeColors();
  const ring = useMemo(() => new THREE.Color(colors.violet || '#9a8fbf'), [colors]);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <pointLight position={[-4, -2, -3]} intensity={0.4} color={ring.getHexString()} />
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
        <Planet ringColor={ring} />
      </Float>
    </>
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

function StaticPortrait() {
  return (
    <div aria-hidden="true" className="relative aspect-square w-64 sm:w-80">
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-line/70" />
      <img
        src={profileImage}
        alt=""
        className="absolute inset-10 rounded-full border border-line/60 object-cover"
        style={{ boxShadow: '0 0 40px color-mix(in srgb, var(--accent-hi) 25%, transparent)' }}
      />
    </div>
  );
}

export default function Hero3D() {
  const reduced = useReducedMotion();
  const webglOk = useMemo(() => supportsWebGL(), []);

  // Reduced motion or no WebGL: render a static CSS portrait instead.
  if (reduced || !webglOk) {
    return <StaticPortrait />;
  }

  return (
    <div className="relative aspect-square w-64 sm:w-80" aria-hidden="true">
      <div className="profile-ring absolute -inset-4 rounded-full opacity-70 blur-2xl" />
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', touchAction: 'pan-y' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
