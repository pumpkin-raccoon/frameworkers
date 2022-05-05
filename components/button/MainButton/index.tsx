import styles from './MainButton.module.scss'

interface MainButtonProps {
  children: React.ReactNode | string
  onClick: () => void
}

const MainButton = ({
  children,
  onClick,
}: MainButtonProps) => {
  return (
    <button
      className={styles.container}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default MainButton
