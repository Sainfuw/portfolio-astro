import { useEffect } from 'react'

import sections from '@/data/sections.json'
import { stopAllActions } from '@lib/stopAnimations'

export const useScrollHandler = (
  setCurrentSection: any,
  actions: any,
  animations: any,
  currentAnimation: any,
  setCurrentAnimation: any
) => {
  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const sectionElement = document.getElementById(section.id)
        if (sectionElement) {
          const { top, bottom } = sectionElement.getBoundingClientRect()
          if (top <= window.innerHeight && bottom >= 0) {
            setCurrentSection(section.id)
            const newAnimationIndex = section.animation

            if (currentAnimation !== newAnimationIndex) {
              const action = actions[animations[newAnimationIndex].name]
              if (currentAnimation !== null) {
                stopAllActions(actions)
              }
              setCurrentAnimation(newAnimationIndex)
              action.play()
              action.loop = 1001
            }
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [
    animations,
    actions,
    currentAnimation,
    setCurrentSection,
    setCurrentAnimation,
  ])
}
