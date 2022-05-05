import Image from "next/image"
import KakaoIcon from 'public/images/kakao.svg'
import styles from './KakaoButton.module.scss'

interface KakaoButtonProps {
  onClick: () => unknown
}

const KakaoButton = ({
  onClick
}: KakaoButtonProps) => {
  return (
    <button 
      className={styles.container}
      onClick={onClick}
    >
      <Image 
        src={KakaoIcon}
        width={40}
        height={40}
        alt="share with kakao"
      />
    </button>
  )
}

export default KakaoButton
