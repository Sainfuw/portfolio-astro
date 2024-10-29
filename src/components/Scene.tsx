import Deadpool from '@/components/Deadpool'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export default function Scene() {
  return (
    <Canvas>
      <directionalLight intensity={3} position={[0, 3, 2]} />
      <Environment preset='city' />
      <Deadpool />
    </Canvas>
  )
}
