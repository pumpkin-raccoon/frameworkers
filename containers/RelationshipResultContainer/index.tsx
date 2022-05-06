import KakaoButton from "components/button/KakaoButton"
import LinkButton from "components/button/LinkButton"
import Toast from "components/Toast"
import { Relationship } from "types/relationship"
import styles from './RelationshipResultContainer.module.scss'
import useShareButtons from "./useShareButtons"

interface RelationshipResultContainerProps {
  relationship: Relationship
}

const RelationshipResultContainer = ({
  relationship
}: RelationshipResultContainerProps) => {
  const {
    onClickKakaoLink,
    onClickShareLink,
    onCloseToast,
    isToastOpened,
  } = useShareButtons(relationship.name ?? '')

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>
          <strong>{relationship.name}님</strong>의 인간관계 분석 결과
        </p>
        <div className={styles.shareButtons}>
          <KakaoButton onClick={onClickKakaoLink}/>
          <LinkButton  onClick={onClickShareLink}/>
          <Toast 
            open={isToastOpened}
            onClose={onCloseToast}
            message="링크가 클립보드에 복사되었습니다."
            type="success"
          />
        </div>
      </div>
    </div>
  )
}

export default RelationshipResultContainer
