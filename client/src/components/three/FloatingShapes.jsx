import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Torus } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ position, shape, color, speed, mouseRef }) {
  const meshRef = useRef()
  const initialPos = useRef(position)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    
    // Float animation
    meshRef.current.position.y = initialPos.current[1] + Math.sin(t * speed + position[0]) * 0.3
    meshRef.current.position.x = initialPos.current[0] + Math.cos(t * speed * 0.7) * 0.1
    
    // Rotation
    meshRef.current.rotation.x = t * speed * 0.3
    meshRef.current.rotation.y = t * speed * 0.5
    meshRef.current.rotation.z = t * speed * 0.2

    // Mouse reactive tilt
    if (mouseRef?.current) {
      meshRef.current.position.x += mouseRef.current.normalX * 0.3
      meshRef.current.position.y += mouseRef.current.normalY * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      {shape === 'icosahedron' && <icosahedronGeometry args={[0.7, 1]} />}
      {shape === 'torus-knot' && <torusKnotGeometry args={[0.4, 0.12, 120, 12]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[0.6]} />}
      {shape === 'dodecahedron' && <dodecahedronGeometry args={[0.55]} />}
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.1}
        distort={0.25}
        speed={2}
        wireframe={false}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

export default function FloatingShapes({ mouseRef }) {
  const shapes = [
    { position: [-3.5, 1.2, -2], shape: 'icosahedron', color: '#00f2ff', speed: 0.4 },
    { position: [3.8, -0.8, -1.5], shape: 'torus-knot', color: '#7000ff', speed: 0.3 },
    { position: [-2.2, -1.8, -3], shape: 'octahedron', color: '#bc13fe', speed: 0.5 },
    { position: [2.5, 2.0, -2.5], shape: 'dodecahedron', color: '#00f2ff', speed: 0.35 },
    { position: [0, 2.8, -4], shape: 'icosahedron', color: '#7000ff', speed: 0.25 },
    { position: [-4.5, -0.5, -3.5], shape: 'torus-knot', color: '#00c8d4', speed: 0.45 },
  ]

  return (
    <group>
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} mouseRef={mouseRef} />
      ))}
    </group>
  )
}
