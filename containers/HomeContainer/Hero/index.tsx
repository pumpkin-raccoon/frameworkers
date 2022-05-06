import Link from 'next/link'
import { FRAMEWORKS } from './constants'
import styles from './Hero.module.scss'

const Hero = () => {
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
      </div>
    </div>
  )
}

export default Hero
