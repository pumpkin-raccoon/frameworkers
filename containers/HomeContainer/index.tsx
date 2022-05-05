import Hero from './Hero'
import styles from './HomeContainer.module.scss'

const HomeContainer = () => {
  return (
    <div className={styles.container}>
      <div>
        <Hero />
      </div>
    </div>
  )
}

export default HomeContainer
