import styles from './Hero.module.scss'

const Hero = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        나를 위한 프레임워크를<br/>
        자유롭게 이용해 보세요!
      </p>
    </div>
  )
}

export default Hero
