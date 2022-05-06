import KakaoButton from "components/button/KakaoButton"
import LinkButton from "components/button/LinkButton"
import MainButton from "components/button/MainButton"
import Toast from "components/Toast"
import { useRouter } from "next/router"
import { Relationship } from "types/relationship"
import RelationshipResult from "./RelationshipResult"
import styles from './RelationshipResultContainer.module.scss'
import useShareButtons from "./useShareButtons"

interface RelationshipResultContainerProps {
  relationship: Relationship
}

const RelationshipResultContainer = ({
  relationship
}: RelationshipResultContainerProps) => {
  const router = useRouter()
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
          <strong>{relationship.name}</strong>님의 인간관계 분석 결과
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
      <div className={styles.result}>
        <RelationshipResult relationship={relationship}/>
      </div>
      <div className={styles.message}>
        <p>
          - 현재 베타서비스 상태이며, 추후 상세 분석이 추가될 예정입니다.
        </p>
      </div>
      <div className={styles.buttonWrapper}>
        <MainButton onClick={() => router.push('/relationship')}>
          나도 분석해보기
        </MainButton>
      </div>
    </div>
  )
}

export default RelationshipResultContainer
