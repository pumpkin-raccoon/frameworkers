import { Alert, Snackbar } from '@mui/material'
import KakaoButton from 'components/button/KakaoButton'
import LinkButton from 'components/button/LinkButton'
import Link from 'next/link'
import { useState } from 'react'
import { sendKakaoLink } from 'services/kakao'
import { copyTextToClipboard } from 'utils/clipboard'
import { FRAMEWORKS } from './constants'
import styles from './Hero.module.scss'

const Hero = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        나를 위한 프레임워크를<br/>
        자유롭게 이용해 보세요!
      </p>
      <div className={styles.frameworks}>
        {FRAMEWORKS.map((framework) => (
          <div
            key={framework.name}
            className={styles.item}
          >
            <div className={styles.imageWrapper}>

            </div>
            <p className={styles.name}>
              {framework.name}
            </p>
            <p className={styles.description}>
              {framework.description}
            </p>
            <div className={styles.buttonWrapper}>
              <Link href={framework.path}>
                <a className={styles.button}>
                  확인해보기
                </a>
              </Link>
            </div>
          </div>
        ))}
        {/* <KakaoButton 
          onClick={() => sendKakaoLink({
            title: '테스트하기',
            description: '테스트하기이',
            path: '',
            image: '',
          })}
        />
        <LinkButton 
          onClick={() => {
            copyTextToClipboard('hihi')
            setOpen(true)
          }}
        />
        <Snackbar 
          open={open} 
          autoHideDuration={3000} 
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
        >
          <Alert 
            onClose={handleClose} 
            severity="success" 
            sx={{ width: '100%' }}
          >
            링크가 클립보드에 복사되었습니다.
          </Alert>
        </Snackbar> */}
      </div>
    </div>
  )
}

export default Hero
