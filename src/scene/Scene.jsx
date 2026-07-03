import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Line } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { scrollState } from '../utils/scrollState'

const PALETTE = {
  violet: new THREE.Color('#8b5cf6'),
  cyan: new THREE.Color('#22d3ee'),
  pink: new THREE.Color('#f472b6'),
  amber: new THREE.Color('#fbbf24'),
  white: new THREE.Color('#e2e8f0'),
}

// Scroll choreography — where the planet lives as you travel down the page.
// p: page progress, x/y: planet position, s: scale, r: extra spin, tint: points tint
const KEYFRAMES = [
  { p: 0.0,  x: 1.9,  y: -0.15, s: 1.0,  tint: new THREE.Color('#c4b5fd') },
  { p: 0.14, x: -2.1, y: 0.1,   s: 0.82, tint: new THREE.Color('#93c5fd') },
  { p: 0.32, x: 2.2,  y: 0.05,  s: 0.9,  tint: new THREE.Color('#67e8f9') },
  { p: 0.52, x: -2.2, y: 0.15,  s: 0.85, tint: new THREE.Color('#a5f3fc') },
  { p: 0.72, x: 2.0,  y: 0.0,   s: 0.8,  tint: new THREE.Color('#f9a8d4') },
  { p: 0.88, x: -1.6, y: 0.1,   s: 0.9,  tint: new THREE.Color('#e9d5ff') },
  { p: 1.0,  x: 0.0,  y: 0.25,  s: 1.25, tint: new THREE.Color('#c4b5fd') },
]

const smoothstep = (t) => t * t * (3 - 2 * t)

function sampleKeyframes(p, out) {
  const kfs = KEYFRAMES
  let a = kfs[0]
  let b = kfs[kfs.length - 1]
  for (let i = 0; i < kfs.length - 1; i++) {
    if (p >= kfs[i].p && p <= kfs[i + 1].p) {
      a = kfs[i]
      b = kfs[i + 1]
      break
    }
  }
  const span = Math.max(b.p - a.p, 1e-6)
  const t = smoothstep(THREE.MathUtils.clamp((p - a.p) / span, 0, 1))
  out.x = THREE.MathUtils.lerp(a.x, b.x, t)
  out.y = THREE.MathUtils.lerp(a.y, b.y, t)
  out.s = THREE.MathUtils.lerp(a.s, b.s, t)
  out.tint.copy(a.tint).lerp(b.tint, t)
  return out
}

// Soft round sprite so particles render as glowing dots, not squares
function makeDotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.8)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(c)
  tex.needsUpdate = true
  return tex
}

function fibonacciSphere(count, radius) {
  const pts = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    pts[i * 3] = Math.cos(theta) * r * radius
    pts[i * 3 + 1] = y * radius
    pts[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return pts
}

function ParticleGlobe({ quality }) {
  const matRef = useRef()
  const count = quality === 'low' ? 2200 : 4200
  const dotTex = useMemo(makeDotTexture, [])

  const { positions, colors } = useMemo(() => {
    const positions = fibonacciSphere(count, 1.55)
    const colors = new Float32Array(count * 3)
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const y = positions[i * 3 + 1] / 1.55
      // violet at the poles → cyan at the equator, with sparkle outliers
      c.copy(PALETTE.violet).lerp(PALETTE.cyan, 1 - Math.abs(y))
      if (Math.random() < 0.06) c.copy(PALETTE.white)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        map={dotTex}
        vertexColors
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Wireframe() {
  return (
    <mesh>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshBasicMaterial color="#6d5bd0" wireframe transparent opacity={0.07} />
    </mesh>
  )
}

// Fresnel rim glow — the planet's atmosphere
function Atmosphere() {
  const shader = useMemo(
    () => ({
      uniforms: { uColor: { value: new THREE.Color('#7c6cf0') } },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying vec3 vNormal;
        void main() {
          float rim = clamp(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
          float intensity = pow(rim, 4.5);
          gl_FragColor = vec4(uColor, 1.0) * intensity * 0.9;
        }
      `,
    }),
    []
  )
  return (
    <mesh scale={1.22}>
      <sphereGeometry args={[1.55, 48, 48]} />
      <shaderMaterial
        args={[shader]}
        side={THREE.FrontSide}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// Great-circle-ish trade routes with glowing packets traveling along them
function TradeArcs({ quality }) {
  const arcCount = quality === 'low' ? 8 : 14
  const packetRefs = useRef([])

  const arcs = useMemo(() => {
    const rng = (seed) => {
      // deterministic-ish pseudo random so arcs don't reshuffle on re-mount
      let s = seed * 9301 + 49297
      return () => {
        s = (s * 233280 + 49297) % 233280
        return s / 233280
      }
    }
    const out = []
    for (let i = 0; i < arcCount; i++) {
      const r = rng(i + 7)
      const a = new THREE.Vector3().setFromSphericalCoords(
        1.55, Math.acos(2 * r() - 1), r() * Math.PI * 2
      )
      const b = new THREE.Vector3().setFromSphericalCoords(
        1.55, Math.acos(2 * r() - 1), r() * Math.PI * 2
      )
      const dist = a.distanceTo(b)
      const lift = 1.55 + dist * 0.42
      const c1 = a.clone().lerp(b, 0.33).normalize().multiplyScalar(lift)
      const c2 = a.clone().lerp(b, 0.66).normalize().multiplyScalar(lift)
      const curve = new THREE.CubicBezierCurve3(a, c1, c2, b)
      out.push({
        curve,
        points: curve.getPoints(64),
        speed: 0.1 + r() * 0.22,
        phase: r(),
        color: [PALETTE.cyan, PALETTE.pink, PALETTE.violet, PALETTE.amber][i % 4],
      })
    }
    return out
  }, [arcCount])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    arcs.forEach((arc, i) => {
      const m = packetRefs.current[i]
      if (!m) return
      const u = (t * arc.speed + arc.phase) % 1
      arc.curve.getPointAt(u, m.position)
      const pulse = 0.75 + Math.sin(t * 6 + i) * 0.25
      m.scale.setScalar(pulse)
    })
  })

  return (
    <group>
      {arcs.map((arc, i) => (
        <group key={i}>
          <Line
            points={arc.points}
            color={arc.color}
            transparent
            opacity={0.28}
            lineWidth={1}
          />
          <mesh ref={(el) => (packetRefs.current[i] = el)}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color={arc.color} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Tilted orbit rings with little tech "satellites"
function OrbitRings() {
  const ring1 = useRef()
  const ring2 = useRef()

  useFrame((state, delta) => {
    const v = 1 + Math.min(Math.abs(scrollState.velocity) * 0.03, 2.5)
    if (ring1.current) ring1.current.rotation.z += delta * 0.12 * v
    if (ring2.current) ring2.current.rotation.z -= delta * 0.09 * v
  })

  const sat = (angle, radius, color, shape) => {
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return (
      <mesh position={[x, y, 0]} rotation={[angle, angle * 0.7, 0]} key={angle}>
        {shape === 'box' ? (
          <boxGeometry args={[0.09, 0.09, 0.09]} />
        ) : shape === 'oct' ? (
          <octahedronGeometry args={[0.07]} />
        ) : (
          <tetrahedronGeometry args={[0.08]} />
        )}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.6}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    )
  }

  return (
    <group>
      <group ref={ring1} rotation={[Math.PI / 2.25, 0.25, 0]}>
        <mesh>
          <torusGeometry args={[2.35, 0.0035, 8, 128]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
        </mesh>
        {sat(0, 2.35, '#22d3ee', 'box')}
        {sat(2.1, 2.35, '#f472b6', 'oct')}
        {sat(4.2, 2.35, '#fbbf24', 'tet')}
      </group>
      <group ref={ring2} rotation={[Math.PI / 1.75, -0.35, 0.3]}>
        <mesh>
          <torusGeometry args={[2.75, 0.0028, 8, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.22} />
        </mesh>
        {sat(1, 2.75, '#a78bfa', 'oct')}
        {sat(3.5, 2.75, '#67e8f9', 'box')}
        {sat(5.3, 2.75, '#f472b6', 'tet')}
      </group>
    </group>
  )
}

// Ambient drifting dust in the void around everything
function SpaceDust({ quality }) {
  const ref = useRef()
  const count = quality === 'low' ? 350 : 750
  const dotTex = useMemo(makeDotTexture, [])

  const positions = useMemo(() => {
    const pts = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pts[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      pts[i * 3 + 2] = r * Math.cos(phi) - 2
    }
    return pts
  }, [count])

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={dotTex}
        color="#94a3b8"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// The planet + everything attached to it, driven by scroll keyframes
function Planet({ quality }) {
  const group = useRef()
  const inner = useRef()
  const pointsTint = useRef(new THREE.Color('#c4b5fd'))
  const sample = useRef({ x: 0, y: 0, s: 1, tint: new THREE.Color() })
  const { size } = useThree()

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const p = THREE.MathUtils.clamp(scrollState.progress, 0, 1)
    const kf = sampleKeyframes(p, sample.current)

    // On narrow screens keep the planet closer to center and smaller
    const aspect = size.width / size.height
    const xFactor = THREE.MathUtils.clamp((aspect - 0.5) / 1.1, 0.25, 1)
    const sFactor = aspect < 0.8 ? 0.78 : 1

    const damp = 1 - Math.pow(0.001, delta) // frame-rate independent lerp
    g.position.x = THREE.MathUtils.lerp(g.position.x, kf.x * xFactor, damp)
    g.position.y = THREE.MathUtils.lerp(g.position.y, kf.y, damp)
    const targetS = kf.s * sFactor
    g.scale.x = g.scale.y = g.scale.z = THREE.MathUtils.lerp(g.scale.x, targetS, damp)

    // Continuous spin, sped up by scroll velocity
    const spin = 0.06 + Math.min(Math.abs(scrollState.velocity) * 0.012, 0.5)
    if (inner.current) {
      inner.current.rotation.y += delta * spin
      inner.current.rotation.x = THREE.MathUtils.lerp(
        inner.current.rotation.x, Math.sin(p * Math.PI * 2) * 0.18, damp
      )
    }

    // Tint the particle globe as sections change
    pointsTint.current.lerp(kf.tint, damp)
    const pts = inner.current?.children.find((c) => c.isPoints)
    if (pts) pts.material.color.copy(pointsTint.current)
  })

  return (
    <group ref={group} position={[1.9, -0.15, 0]}>
      <group ref={inner}>
        <ParticleGlobe quality={quality} />
        <Wireframe />
        <TradeArcs quality={quality} />
      </group>
      <Atmosphere />
      <OrbitRings />
    </group>
  )
}

// Mouse-parallax camera
function CameraRig() {
  const { camera } = useThree()
  useFrame((state, delta) => {
    const damp = 1 - Math.pow(0.002, delta)
    const px = state.pointer.x
    const py = state.pointer.y
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, px * 0.35, damp)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, py * 0.25, damp)
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z, 6.2 - Math.sin(scrollState.progress * Math.PI) * 0.5, damp
    )
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene() {
  const quality =
    typeof window !== 'undefined' && window.innerWidth < 768 ? 'low' : 'high'

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#050510']} />
        <fog attach="fog" args={['#050510', 9, 18]} />

        <ambientLight intensity={0.4} />
        <pointLight position={[4, 3, 4]} intensity={12} color="#8b5cf6" />
        <pointLight position={[-4, -2, 3]} intensity={8} color="#22d3ee" />

        <Stars radius={70} depth={40} count={quality === 'low' ? 1500 : 3200} factor={3.2} saturation={0.4} fade speed={0.6} />
        <SpaceDust quality={quality} />
        <Planet quality={quality} />
        <CameraRig />

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.75}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.6}
            mipmapBlur
            radius={0.72}
          />
          <Vignette eskil={false} offset={0.22} darkness={0.78} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
