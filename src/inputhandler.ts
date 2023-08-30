
export const activeKeys : any = {};

document.addEventListener('keydown', key => {
  if(activeKeys[key.key]) {return}
  activeKeys[key.key] = true
})
document.addEventListener('keyup', key => {activeKeys[key.key] = false})