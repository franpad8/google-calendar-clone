import { WheelEvent } from 'react'

interface Params {
  onMouseWheelUp: () => void,
  onMouseWheelDown: () => void,
}

function useMouseWheel ({ onMouseWheelUp, onMouseWheelDown }: Params) {
  let lastTime: number = (new Date()).getTime()

  return function (e: WheelEvent) {
    const currentTime = (new Date()).getTime()
    const deltaTime = currentTime - lastTime

    // We apply a debouncing to avoid the excesive execution
    // of change months function when using the mouse wheel
    if ((deltaTime < 200)) return

    if (e.deltaY > 0) {
      onMouseWheelDown()
    } else {
      onMouseWheelUp()
    }

    lastTime = currentTime
  }
}

export default useMouseWheel
