import MainButton from "components/button/MainButton"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styles from './RelationshipResultContainer.module.scss'
import useInstagramFollower from "./useInstagramFollower"
import useRelationship from "./useRelationship"

const RelationshipResultContainer = () => {
  const { name, instagram } = useRouter().query
  const {
    relations,
  } = useRelationship()
  const {
    trackFollower
  } = useInstagramFollower()

  useEffect(() => {
    trackFollower('jaeha.official')
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <p className={styles.title}>
            {name}의 지인 목록 ({relations.length}명)
          </p>
          <button className={styles.add}>
            + 직접 추가하기
          </button>
        </div>
      </div>
      <div className={styles.box}>

      </div>
      <div className={styles.buttonWrapper}>
        <MainButton onClick={() => {}}>
          분석 결과 확인하기
        </MainButton>
      </div>
    </div>
  )
}

export default RelationshipResultContainer
