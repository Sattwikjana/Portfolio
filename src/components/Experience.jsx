import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Stars, Float, Text, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function Experience() {
  const scroll = useScroll()
  const cameraGroup = useRef()

  useFrame((state, delta) => {
    // scroll.offset goes from 0 to 1
    const offset = scroll.offset
    
    // Animate camera position along Z and X axes.
    // Page 0: Z=5, X=0
    // Page 1: Z=-15, X=5
    // Page 2: Z=-35, X=-5
    // Page 3: Z=-55, X=0
    const targetZ = 5 - (offset * 60)
    const targetX = Math.sin(offset * Math.PI * 2) * 5
    const targetY = Math.cos(offset * Math.PI * 2) * 2
    
    cameraGroup.current.position.z = THREE.MathUtils.lerp(cameraGroup.current.position.z, targetZ, 0.1)
    cameraGroup.current.position.x = THREE.MathUtils.lerp(cameraGroup.current.position.x, targetX, 0.1)
    cameraGroup.current.position.y = THREE.MathUtils.lerp(cameraGroup.current.position.y, targetY, 0.1)

    // Slight rotation for cinematic feel
    cameraGroup.current.rotation.y = THREE.MathUtils.lerp(cameraGroup.current.rotation.y, -targetX * 0.05, 0.1)
    cameraGroup.current.rotation.z = THREE.MathUtils.lerp(cameraGroup.current.rotation.z, -targetX * 0.02, 0.1)
  })

  return (
    <group ref={cameraGroup}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ff6b6b" />
      <directionalLight position={[-10, 10, -5]} intensity={1} color="#4ecdc4" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#feca57" />

      {/* Background Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />

      {/* 3D Nodes / Islands representing the sections */}
      
      {/* Node 1: Home (Start at z=0) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[3, -1, -2]}>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial color="#ff6b6b" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0.1} metalness={0.8} roughness={0.2} speed={5} distort={0.4} />
        </mesh>
      </Float>

      {/* Node 2: Experience (z ~ -15) */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={[-4, 2, -20]}>
        <mesh rotation={[Math.PI/4, Math.PI/4, 0]}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color="#4ecdc4" metalness={0.5} roughness={0.1} wireframe={false} />
        </mesh>
        <mesh rotation={[Math.PI/4, Math.PI/4, 0]} scale={1.1}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color="#ffffff" wireframe={true} transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* Node 3: Projects (z ~ -35) */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2} position={[5, -2, -40]}>
        <mesh>
          <torusGeometry args={[2, 0.5, 32, 100]} />
          <meshPhysicalMaterial color="#feca57" metalness={0.9} roughness={0} transmission={0.5} ior={1.5} thickness={1} clearcoat={1} />
        </mesh>
        <Text position={[0, 0, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
          DATA
        </Text>
      </Float>

      {/* Node 4: Contact (z ~ -55) */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1} position={[0, 1, -60]}>
        <mesh>
          <octahedronGeometry args={[2.5, 0]} />
          <MeshDistortMaterial color="#ffffff" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0.1} metalness={1} roughness={0.3} speed={2} distort={0.2} />
        </mesh>
      </Float>

      {/* Connecting Path / Particles */}
      <Particles />
    </group>
  )
}

// Simple floating particles indicating the path
function Particles() {
  const count = 300
  const positions = new Float32Array(count * 3)
  for(let i=0; i<count; i++) {
    positions[i*3] = (Math.random() - 0.5) * 20
    positions[i*3+1] = (Math.random() - 0.5) * 20
    positions[i*3+2] = -Math.random() * 80 // Spread along Z axis
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.5} sizeAttenuation={true} />
    </points>
  )
}
