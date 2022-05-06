import Link from 'next/link'
import { MENU_ITEMS } from './constants'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <div className={styles.logo}>
          Frameworkers
        </div>
      </Link>
      
      <div className={styles.menus}>
        {MENU_ITEMS.map((menuItem) => (
          <Link 
            href={menuItem.path}
            key={menuItem.label}
            passHref
          >
            <a className={styles.menu} target="_blank">
              {menuItem.label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Header
