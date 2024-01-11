import { useEffect, useRef } from 'react'

interface Props {
  onClickOutside: () => void,
  listenCapture?: boolean
}

function useClickOutside ({ onClickOutside, listenCapture = true }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClick (e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside()
      }
    }

    document.addEventListener('click', handleClick, listenCapture)

    return () => document.removeEventListener('click', handleClick, listenCapture)
  }, [ref, onClickOutside, listenCapture])

  return ref
}

export default useClickOutside
