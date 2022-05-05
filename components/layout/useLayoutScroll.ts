import { useEffect, useRef, useState } from "react"

const useLayoutScroll = () => {
  const mainRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    const mainNodeTop = mainRef.current?.getBoundingClientRect()?.top ?? 0
    const hasScrolled = mainNodeTop < -10
    setIsScrolled(hasScrolled)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return {
    mainRef,
    isScrolled
  }
}

export default useLayoutScroll
