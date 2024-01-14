import { CSSProperties, createContext } from 'react'

export interface ModalContextDataType {
  openWindow: string,
  windowContainerStyle?: CSSProperties
  close: () => void,
  open: (windowId: string, windowContainerStyle?:CSSProperties) => void,
}

export const ModalContext = createContext<ModalContextDataType | null>(null)
