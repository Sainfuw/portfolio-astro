import { useEffect } from 'react'

export const useAnimationHandler = (
  animations: any,
  actions: any,
  currentAnimation: any
) => {
  useEffect(() => {
    if (animations.length > 0) {
      const action = actions[animations[currentAnimation].name]
      action.play()
      action.loop = 1001
    }
  }, [animations, actions, currentAnimation])
}
