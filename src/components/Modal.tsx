import React, { MouseEvent, ReactElement, RefObject, cloneElement, createContext, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import useClickOutside from '../hooks/useClickOutside'

interface ModalContextValueType {
  openWindow: string,
  xPos: number,
  yPos: number,
  close: () => void,
  open: (windowId: string, xPos?: number, yPos?: number) => void
}

const ModalContext = createContext<ModalContextValueType | null>(null)

function Modal ({ children }: { children: React.ReactElement }) {
  const [openWindow, setOpenWindow] = useState<string>('')
  const [xPos, setXPos] = useState<number>(0)
  const [yPos, setYPos] = useState<number>(0)

  function close () : void {
    setOpenWindow('')
  }

  function open (windowId: string, xPos = 0, yPos = 0) : void {
    setXPos(xPos)
    setYPos(yPos)
    setOpenWindow(windowId)
  }

  const value: ModalContextValueType = {
    openWindow,
    xPos,
    yPos,
    close,
    open
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

interface OpenPropsType {
  children: ReactElement,
  opens: string
}

function Open ({ children, opens: windowId }: OpenPropsType) {
  const context = useContext(ModalContext)
  if (!context) throw new Error('ModalOpen used outside of ModalContext')

  const { open } = context

  function handleClick (event: MouseEvent<HTMLElement>) {
    const xPos = event.clientX
    const yPos = event.clientY

    console.log('open')
    open(windowId, xPos, yPos)
  }

  return cloneElement(children, { onClick: handleClick })
}

function Close ({ children }: {children: ReactElement}) {
  const context = useContext(ModalContext)
  if (!context) throw new Error('ModalOpen used outside of ModalContext')

  const { close } = context

  return cloneElement(children, { onClick: close })
}

interface WindowPropsType {
  children: ReactElement
  windowId: string
  withBackground?: boolean
}
function Window ({ children, windowId, withBackground = true }: WindowPropsType) {
  const context = useContext(ModalContext)
  if (!context) throw new Error('ModalOpen used outside of ModalContext')
  const { openWindow, close, xPos, yPos } = context

  // State to manage the exact coordinates where to display the modal window
  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)

  const windowElementRef = useClickOutside({ onClickOutside: () => close() })

  useEffect(() => {
    if (!windowElementRef.current) return

    setX(Math.min(window.innerWidth - windowElementRef.current.clientWidth - 100, xPos))
    setY(Math.min(window.innerHeight - windowElementRef.current.clientHeight - 100, yPos))
  }, [windowElementRef, xPos, yPos])

  if (openWindow !== windowId) return null
  const styles = { left: `${x}px`, top: `${y}px` }

  return createPortal(
    <>
      {withBackground && <div className='absolute left-0 top-0 h-full w-full bg-transparent' />}
      <div
        className='absolute z-50 rounded-md border bg-white shadow-lg transition-all'
        style={styles}
        ref={windowElementRef as RefObject<HTMLDivElement>}
      >
        {children}
      </div>
    </>,
    document.body
  )
}

Modal.Open = Open
Modal.Close = Close
Modal.Window = Window

export default Modal
