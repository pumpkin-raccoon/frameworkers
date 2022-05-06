import MainButton from "components/button/MainButton"
import { useState } from "react"
import { RELATIONSHIP_COMMENTS } from "./constants"
import styles from './RelationshipContainer.module.scss'
import StartModal from './StartModal';

const RelationshipContainer = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.introduction}>
        <img
          className={styles.imageWrapper}
          alt="인간관계 다이어그램"
          src="/images/relation.png"
        />
        <p className={styles.title}>
          인간관계 다이어그램
        </p>
        <p className={styles.description}>
          나의 인간관계를 데이터로 확인해 보세요.
        </p>
      </div>
      <div className={styles.commentPart}>
        {RELATIONSHIP_COMMENTS.map((comment) => (
          <div 
            key={comment}
            className={styles.comment}
          >
            <p>
              {comment}
            </p>
          </div>
        ))}
      </div>
      <div className={styles.exampleWrapper}>
        <p className={styles.exampleTitle}>
          이런 분석을 확인할 수 있어요!
        </p>
        <img 
          src="/images/relation-example-01.png"
          alt="relationship framework example"
        />
        <img 
          src="/images/relation-example-02.png"
          alt="relationship framework example"
        />
      </div>
      <div className={styles.buttonWrapper}>
        <MainButton onClick={() => setOpenModal(true)}>
          시작하기
        </MainButton>
      </div>
      <StartModal 
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  )
}

export default RelationshipContainer
