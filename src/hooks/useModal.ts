import { useContext } from 'react'
import { ModalContext } from '../contexts/modalContext'

export default function useModal () {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal used outside of ModalContext')

  return { open: context.open }
}
