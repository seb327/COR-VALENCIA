import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame }                    from '@react-three/fiber';
import { Environment }                         from '@react-three/drei';
import { gsap }                                from 'gsap';
import { ScrollTrigger }                       from 'gsap/ScrollTrigger';
import * as THREE                              from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────────────────
   Somatic Core — frequency-ring breath visualisation.
   Replaces the rose-gold blob with concentric pulse rings emanating from
   a metallic bronze "heart" — direct reference to the dot above the
   meditation figure in the COR medallion logo.

   Palette: drawn from the logo medallion only.
   - rose-gold #C29078  (medallion main)
   - soft gold #D4A84B  (highlight + center heart)
   - warm cream #F5EFE4 (linen background tint)
   - copper    #A06850  (engraved depth)

   Architecture (per the Somatic-Tech brief):
   - Persistent across the full scroll journey (fixed -z-10).
   - GSAP ScrollTrigger drives `animState` (position/scale/energy).
   - useFrame lerps the mesh group toward animState every frame.
   - Each ring has a phase offset, creating a continuous breath cascade.
   ──────────────────────────────────────────────────────────────────────── */

interface AnimState {
  x:      number;   /* -1.5 ... +1.5 horizontal drift */
  y:      number;   /* vertical drift                 */
  scale:  number;   /* group size                     */
  energy: number;   /* pulse rate multiplier (0.5–1.5)*/
}

const animState: AnimState = {
  x: 0, y: 0, scale: 1.25, energy: 1.0,
};

const RING_COUNT  = 8;
/* Ring colours — chosen to read on cream/linen background.
   Cream removed (would be invisible); deep teal added for contrast.    */
const RING_COLORS = ['#C29078', '#A06850', '#1D5C5C', '#C17B3F'];

/* ─── Center "heart" — metallic bronze dot (logo reference) ─────────── */
function HeartCore() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    /* Subtle breath pulse — heartbeat rhythm */
    const breath = Math.sin(state.clock.elapsedTime * 0.6) * 0.06 + 1;
    meshRef.current.scale.setScalar(breath);
  });

  return (
    <group>
      {/* Inner metallic bronze dot */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.085, 32, 32]} />
        <meshStandardMaterial
          color="#D4A84B"
          emissive="#C29078"
          emissiveIntensity={0.55}
          metalness={0.75}
          roughness={0.28}
        />
      </mesh>
      {/* Soft inner halo */}
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color="#D4A84B" transparent opacity={0.14} />
      </mesh>
      {/* Outer halo — rose-gold radiance */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#C29078" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

/* ─── Pulse ring — expands from center, fades out, repeats ───────────── */
function FrequencyRing({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef  = useRef<THREE.MeshBasicMaterial>(null!);
  const phaseOffset = (index / RING_COUNT) * Math.PI * 2;
  const color = RING_COLORS[index % RING_COLORS.length];

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;

    const t      = state.clock.elapsedTime;
    /* energy multiplier comes from GSAP scroll choreography */
    const cycle  = ((t * 0.32 * animState.energy) + phaseOffset) % (Math.PI * 2);
    const p      = cycle / (Math.PI * 2);                    /* 0 → 1 */

    /* Scale: ring grows from 0.3 to ~3.5 over one cycle (off-screen at end) */
    const s = 0.3 + p * 3.2;
    meshRef.current.scale.setScalar(s);

    /* Opacity bell curve: fade in fast, fade out slow */
    const fadeIn  = Math.min(1, p * 6);
    const fadeOut = 1 - Math.pow(p, 1.8);
    matRef.current.opacity = Math.min(fadeIn, fadeOut) * 0.55;
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1, 0.004, 6, 128]} />
      <meshBasicMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

/* ─── Composed group — GSAP drives outer transforms, time drives inner ─ */
function FrequencyCore() {
  const outerRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!outerRef.current) return;
    const g = outerRef.current;

    /* Smooth lerp toward GSAP-driven targets */
    g.position.x += (animState.x - g.position.x) * 0.04;
    g.position.y += (animState.y - g.position.y) * 0.04;
    const ts = animState.scale;
    g.scale.x += (ts - g.scale.x) * 0.04;
    g.scale.y += (ts - g.scale.y) * 0.04;
    g.scale.z += (ts - g.scale.z) * 0.04;

    /* Inner group: slow Z rotation + organic wobble */
    if (innerRef.current) {
      innerRef.current.rotation.z += delta * 0.045;
      innerRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
      innerRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.12) * 0.08;
    }
  });

  return (
    <group ref={outerRef}>
      <group ref={innerRef}>
        <HeartCore />
        {Array.from({ length: RING_COUNT }).map((_, i) => (
          <FrequencyRing key={i} index={i} />
        ))}
      </group>
    </group>
  );
}

/* ─── Mobile fallback — pure SVG, animated rings, zero WebGL ─────────── */
function MobileFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center overflow-hidden"
    >
      <svg viewBox="-100 -100 200 200" className="size-[85vmin] opacity-55">
        {[1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx="0" cy="0"
            r={i * 14}
            fill="none"
            stroke={['#C29078','#D4A84B','#F5EFE4','#A06850','#C29078'][i - 1]}
            strokeWidth="0.35"
            opacity={1 - i * 0.16}
          >
            <animate
              attributeName="r"
              values={`${i * 14};${i * 14 + 10};${i * 14}`}
              dur={`${6 + i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values={`${1 - i * 0.16};${0.3 - i * 0.05};${1 - i * 0.16}`}
              dur={`${6 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {/* Center heart */}
        <circle cx="0" cy="0" r="2.5" fill="#D4A84B" opacity="0.9">
          <animate attributeName="r" values="2.5;3;2.5" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

export function SomaticCore() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(hover:none) and (pointer:coarse)').matches);
  }, []);

  /* GSAP scroll choreography — maps scroll position to core motion + energy */
  useEffect(() => {
    if (isMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start:   'top top',
        end:     'bottom bottom',
        scrub:   1.5,
      },
      defaults: { ease: 'power1.inOut', duration: 0.25 },
    });

    /* Hero -> Practice: drift right, smaller, calm energy */
    tl.to(animState, { x:  1.4, y:  0.25, scale: 0.85, energy: 0.65 });
    /* Practice -> Offerings: re-center, larger, more energy */
    tl.to(animState, { x: -0.45, y: -0.35, scale: 1.10, energy: 1.45 });
    /* Offerings -> Voice: drift left, calm again */
    tl.to(animState, { x: -1.50, y:  0.20, scale: 0.90, energy: 1.00 });
    /* Voice -> Join: re-center, settled */
    tl.to(animState, { x:  0,    y:  0,    scale: 1.10, energy: 0.85 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isMobile]);

  if (isMobile) return <MobileFallback />;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[ 2,  2,  4]} intensity={1.2} color="#F5EFE4" />
          <pointLight position={[-2, -2,  2]} intensity={0.6} color="#D4A84B" />
          <Environment preset="sunset" />
          <FrequencyCore />
        </Suspense>
      </Canvas>
    </div>
  );
}
