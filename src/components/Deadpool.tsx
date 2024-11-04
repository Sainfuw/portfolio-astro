import sections from '@data/sections.json'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useRef, useState } from 'react'

import { useAnimationHandler } from '@/hooks/useAnimation'
import { useScrollHandler } from '@/hooks/useScroll'

export default function Deadpool(props: any) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/deadpool.glb')
  const { actions } = useAnimations(animations, group)
  const { pointer } = useThree()

  const [currentSection, setCurrentSection] = useState('hero')
  const [currentAnimation, setCurrentAnimation] = useState(0)

  useAnimationHandler(animations, actions, currentAnimation)

  useScrollHandler(
    setCurrentSection,
    actions,
    animations,
    currentAnimation,
    setCurrentAnimation
  )

  useFrame(() => {
    const { x, y } = pointer
    const head = nodes.mixamorigHead_06

    head.rotation.y = x * 0.5
    head.rotation.x = (y - 0.5) * -0.5

    const { position, rotation } = sections.find(
      (section) => section.id === currentSection
    )

    gsap.to(group.current.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 3,
      ease: 'power1.out',
    })

    gsap.to(group.current.rotation, {
      x: rotation.x,
      y: rotation.y,
      z: rotation.z,
      duration: 3,
      ease: 'power1.out',
    })
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Sketchfab_Scene'>
        <group
          name='Sketchfab_model'
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          scale={0.004}
        >
          <group name='fbx_mergefbx' rotation={[Math.PI / 2, 0, 0]}>
            <group name='Object_2'>
              <group name='RootNode'>
                <group name='Object_4'>
                  <primitive object={nodes._rootJoint} />
                  {Object.keys(nodes).map((key) => {
                    const node = nodes[key]
                    if (
                      node.geometry &&
                      node.skeleton &&
                      materials[node.material.name]
                    ) {
                      return (
                        <skinnedMesh
                          key={key}
                          geometry={node.geometry}
                          material={materials[node.material.name]}
                          skeleton={node.skeleton}
                        />
                      )
                    }
                    return null
                  })}
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
