export const stopAllActions = (actions: any) => {
  if (!actions) return
  Object.values(actions).forEach((action) => action.stop())
}
