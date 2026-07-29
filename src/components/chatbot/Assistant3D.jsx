import { ContactShadows, Environment, Float } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { memo, useRef } from 'react'
import * as THREE from 'three'

function Character() {
  const body = useRef(null)
  const head = useRef(null)
  const leftEye = useRef(null)
  const rightEye = useRef(null)
  const arm = useRef(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (body.current) body.current.rotation.y = THREE.MathUtils.lerp(body.current.rotation.y, state.pointer.x * 0.16, 0.06)
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, state.pointer.x * 0.3, 0.08)
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -state.pointer.y * 0.16, 0.08)
    }
    const blink = Math.sin(time * 0.72) > 0.985 ? 0.12 : 1
    if (leftEye.current) leftEye.current.scale.y = blink
    if (rightEye.current) rightEye.current.scale.y = blink
    if (arm.current) arm.current.rotation.z = time < 3.2 ? -0.65 + Math.sin(time * 7) * 0.25 : -0.18 + Math.sin(time * 0.8) * 0.025
  })

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.22}>
      <group ref={body} position={[0, -0.25, 0]}>
        <mesh position={[0, -0.38, 0]} scale={[0.72, 0.82, 0.52]}><sphereGeometry args={[0.68, 48, 48]} /><meshPhysicalMaterial color="#a65335" roughness={0.35} clearcoat={0.45} /></mesh>
        <group ref={head} position={[0, 0.62, 0.03]}>
          <mesh scale={[0.72, 0.7, 0.65]}><sphereGeometry args={[0.72, 48, 48]} /><meshPhysicalMaterial color="#ead2b8" roughness={0.48} clearcoat={0.2} /></mesh>
          <mesh position={[0, 0.23, 0.56]} scale={[0.6, 0.24, 0.15]}><sphereGeometry args={[0.6, 32, 20]} /><meshStandardMaterial color="#392f29" /></mesh>
          {[-0.22, 0.22].map((x, index) => <group key={x} ref={index ? rightEye : leftEye} position={[x, 0.04, 0.63]}><mesh><sphereGeometry args={[0.105, 24, 24]} /><meshStandardMaterial color="#fffaf3" /></mesh><mesh position={[0, 0, 0.085]}><sphereGeometry args={[0.052, 20, 20]} /><meshStandardMaterial color="#282621" /></mesh></group>)}
          <mesh position={[0, -0.23, 0.66]} rotation={[0, 0, Math.PI]}><torusGeometry args={[0.13, 0.022, 12, 32, Math.PI]} /><meshStandardMaterial color="#9b5848" /></mesh>
        </group>
        <group ref={arm} position={[-0.63, -0.12, 0]} rotation={[0, 0, -0.2]}><mesh position={[0, -0.34, 0]} scale={[0.18, 0.5, 0.18]}><capsuleGeometry args={[0.45, 0.55, 10, 20]} /><meshStandardMaterial color="#a65335" /></mesh><mesh position={[0, -0.92, 0]}><sphereGeometry args={[0.19, 24, 24]} /><meshStandardMaterial color="#ead2b8" /></mesh></group>
      </group>
    </Float>
  )
}

function Assistant3D() {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.35, 4.2], fov: 38 }} gl={{ alpha: true, antialias: true }}><ambientLight intensity={1.5} /><directionalLight position={[3, 4, 4]} intensity={2.2} color="#fff1dc" /><directionalLight position={[-3, 1, 2]} intensity={1.2} color="#c29362" /><Character /><ContactShadows position={[0, -1.25, 0]} opacity={0.28} scale={3} blur={2.5} /><Environment preset="studio" /></Canvas>
}

export default memo(Assistant3D)
