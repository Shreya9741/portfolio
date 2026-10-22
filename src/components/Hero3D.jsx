import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const ACCENT = '#5eead4';

function Sculpture({ reduced }) {
  const group = useRef();
  const ring = useRef();

  useFrame((state, delta) => {
    if (reduced || !group.current) return;
    // Slow idle spin + gentle pointer-follow (smoothed)
    group.current.rotation.y += delta * 0.18;
    const tx = state.pointer.y * 0.35;
    const ty = state.pointer.x * 0.5;
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.04;
    group.current.position.x += (ty * 0.4 - group.current.position.x) * 0.04;
    if (ring.current) ring.current.rotation.z += delta * 0.25;
  });

  return (
    <Float speed={reduced ? 0 : 1.4} rotationIntensity={0.15} floatIntensity={reduced ? 0 : 0.7}>
      <group ref={group}>
        {/* Outer wireframe shell */}
        <mesh>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.55} />
        </mesh>
        {/* Inner faceted core */}
        <mesh>
          <icosahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial color="#12161a" metalness={0.85} roughness={0.25} flatShading />
        </mesh>
        {/* Orbit ring */}
        <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.1, 0.012, 8, 96]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Hero3D() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering entirely when the hero scrolls out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reduced motion: render a single static frame ('demand'). Offscreen: pause ('never').
  const frameloop = !visible ? 'never' : reduced ? 'demand' : 'always';

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 5]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-4, -2, 2]} intensity={12} color={ACCENT} />
        <Sculpture reduced={reduced} />
      </Canvas>
    </div>
  );
}
