import Image from "next/image"
import LinkIcon from 'public/images/link.svg'
import styles from './LinkButton.module.scss'

interface LinkButtonProps {
  onClick: () => unknown
}

const LinkButton = ({
  onClick
}: LinkButtonProps) => {
  return (
    <button 
      className={styles.container}
      onClick={onClick}
    >
      <Image 
        src={LinkIcon}
        width={40}
        height={40}
        alt="share with link"
      />
    </button>
  )
}

export default LinkButton
