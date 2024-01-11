import React, { ReactElement, RefObject, cloneElement, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import useClickOutside from '../hooks/useClickOutside'

interface ModalContextValueType {
  openWindow: string,
  close: () => void,
  open: (windowId: string) => void
}

const ModalContext = createContext<ModalContextValueType | null>(null)

function Modal ({ children }: { children: React.ReactElement }) {
  const [openWindow, setOpenWindow] = useState<string>('')

  function close () : void {
    setOpenWindow('')
  }

  function open (windowId: string) : void {
    setOpenWindow(windowId)
  }

  const value: ModalContextValueType = {
    openWindow,
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

  function handleClick () {
    open(windowId)
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
  const { openWindow, close } = context

  const ref = useClickOutside({ onClickOutside: () => close() })

  if (openWindow !== windowId) return null

  return createPortal(
    <>
      {withBackground && <div className='absolute left-0 top-0 h-full w-full bg-transparent' />}
      <div className='absolute left-[30%] top-[30%] z-50 rounded-md border bg-white shadow-lg ' ref={ref as RefObject<HTMLDivElement>}>
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
