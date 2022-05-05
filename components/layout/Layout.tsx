import classNames from "classnames"
import { ReactNode } from "react"
import Header from "./Header"
import styles from './Layout.module.scss'
import useLayoutScroll from "./useLayoutScroll"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({
  children
}: LayoutProps) => {
  const {
    isScrolled,
    mainRef
  } = useLayoutScroll()

  return (
    <div className={styles.container}>
      <header className={classNames([
        styles.header, 
        {[styles.border]: isScrolled}
      ])}>
        <Header />
      </header>

      <main 
        ref={mainRef}
        className={styles.main}
      >
        {children}
      </main>
      
      <footer>

      </footer>
    </div>
  )
}

export default Layout
