import React, {
  CSSProperties,
  ReactElement,
  RefObject,
  cloneElement,
  useContext,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import useClickOutside from '../hooks/useClickOutside'
import { ModalContext, ModalContextDataType } from '../contexts/modalContext'

function Modal ({ children }: { children: React.ReactElement }) {
  const [openWindow, setOpenWindow] = useState<string>('')
  const [windowContainerStyle, setWindowContainerStyle] = useState<CSSProperties | undefined>(undefined)

  function close () : void {
    setOpenWindow('')
  }

  function open (windowId: string, windowContainerStyle?: CSSProperties) : void {
    setWindowContainerStyle(windowContainerStyle)
    setOpenWindow(windowId)
  }

  const value: ModalContextDataType = {
    openWindow,
    windowContainerStyle,
    close,
    open
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

interface OpenPropsType {
  children: ReactElement,
  opens: string,
  windowContainerStyle?: CSSProperties
}

function Open ({ children, opens: windowId, windowContainerStyle }: OpenPropsType) {
  const context = useContext(ModalContext)
  if (!context) throw new Error('ModalOpen used outside of ModalContext')

  const { open } = context

  function handleClick () {
    open(windowId, windowContainerStyle)
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
  const { openWindow, close, windowContainerStyle } = context

  const windowElementRef = useClickOutside({ onClickOutside: () => close() })

  if (openWindow !== windowId) return null

  // If no x and y coords are set, then display modal at the center of the screen
  const containerStyles = windowContainerStyle ||
    { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }

  return createPortal(
    <>
      {withBackground && <div className='absolute left-0 top-0 h-full w-full bg-transparent' />}
      <div
        className='absolute z-50 rounded-md border bg-white shadow-lg transition-all'
        ref={windowElementRef as RefObject<HTMLDivElement>}
        style={containerStyles}
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
