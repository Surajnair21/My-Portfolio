import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import ParticleField from './ParticleField'
import FloatingShapes from './FloatingShapes'

export default function HeroScene({ mouseRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ position: 'absolute', inset: 0, background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00f2ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#7000ff" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#bc13fe" />

      <Suspense fallback={null}>
        <ParticleField count={3000} />
        <FloatingShapes mouseRef={mouseRef} />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
