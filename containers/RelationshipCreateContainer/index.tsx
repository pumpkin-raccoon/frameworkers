import { CircularProgress } from "@mui/material"
import classNames from "classnames"
import MainButton from "components/button/MainButton"
import ConfirmModal from "components/ConfirmModal"
import LoadingModal from "components/LoadingModal"
import Toast from "components/Toast"
import { useRouter } from "next/router"
import { RelationshipPerson } from "types/relationship"
import RelationModal from "./RelationModal"
import { getAgeText, getGenderText, getIntimacyText } from "./RelationModal/functions"
import styles from './RelationshipCreateContainer.module.scss'
import useRelationship from "./useRelationship"

const RelationshipCreateContainer = () => {
  const { name } = useRouter().query
  const {
    people,
    targetPerson,
    addPerson,
    openModal,
    updatePerson,
    closeModal,
    removePerson,
    hasInformation,
    openTargetPerson,
    handleSubmit,
    isLoading,
    setIsToastOpened,
    isToastOpened,
    toastMessage,
    postRequest,
    isLoadingAvailability,
    isLoadingProfile,
    shouldRenderPeople,
    shouldRenderEmpty
  } = useRelationship()

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <p className={styles.title}>
            <strong>{name}</strong>님의 지인 목록 ({people.length}명)
          </p>
          <button 
            className={styles.add}
            onClick={addPerson}
          >
            + 직접 추가하기
          </button>
        </div>
      </div>
      <div className={classNames([
        styles.box,
        {[styles.empty]: people.length === 0}
      ])}>
        {shouldRenderPeople && (
          <div>
            {people.map((relation: RelationshipPerson, index: number) => (
              <div
                key={index}
                className={styles.relation}
                onClick={() => openTargetPerson(index)}
              >
                <div>
                  <p className={styles.relationName}>
                    {relation.name ?? '-'}
                  </p>
                  <div>
                    {hasInformation(relation)
                      ?
                      <div>
                        <div className={styles.row}>
                          {relation.gender && (
                            <p className={styles.tag}>
                              {getGenderText(relation.gender)}
                            </p>
                          )}
                          {relation.age && (
                            <p className={styles.tag}>
                              {getAgeText(relation.age)}
                            </p>
                          )}
                          {relation.intimacy && (
                            <p className={styles.tag}>
                              {getIntimacyText(relation.intimacy)}
                            </p>
                          )}
                        </div>
                        {(relation.category?.length ?? 0) > 0 && (
                          <div className={styles.row}>
                            {relation.category?.map((categoryText) => (
                              <p 
                                key={categoryText}
                                className={classNames(styles.tag, styles.category)}
                              >
                                {categoryText}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                      :
                      <p className={styles.relationEmpty}>
                        상세 정보가 없습니다.
                      </p>
                    }
                  </div>
                </div>
                <div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      removePerson(index)
                    }}
                    className={styles.removeButton}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {shouldRenderEmpty && (
          <p className={styles.emptyMessage}>
            지인을 추가해 주세요.
          </p>
        )}
        {isLoadingProfile && (
          <div className={styles.loadingBox}>
            <CircularProgress />
            <p>
              인스타그램 팔로잉 목록을 불러오고 있습니다.<br/>
              시간이 조금 걸릴지도 몰라요… 삐질;;
            </p>
          </div>
        )}
      </div>
      <div className={styles.buttonWrapper}>
        <MainButton onClick={handleSubmit}>
          분석 결과 확인하기
        </MainButton>
      </div>
      <RelationModal 
        updatePerson={updatePerson}
        inputPerson={targetPerson}
        open={openModal === 'relation'}
        onClose={closeModal}
      />
      <ConfirmModal
        open={openModal === 'confirm'}
        onClose={closeModal}
        onConfirm={postRequest}
        title="분석 결과를 확인해 볼까요?"
        content={(
          <p>
            분석 결과를 확인하면 아무도 세부 정보를 확인하거나<br/>
            수정할 수 없습니다. 마지막으로 한번 더 점검해주세요.
          </p>
        )}
      />
      <Toast 
        message={toastMessage}
        open={isToastOpened}
        onClose={() => setIsToastOpened(false)}
      />
      <LoadingModal open={isLoading || isLoadingAvailability}/>
    </div>
  )
}

export default RelationshipCreateContainer
