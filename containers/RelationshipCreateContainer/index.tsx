import classNames from "classnames"
import MainButton from "components/button/MainButton"
import LoadingModal from "components/LoadingModal"
import Toast from "components/Toast"
import { useRouter } from "next/router"
import { RelationshipPerson } from "types/relationship"
import RelationModal from "./RelationModal"
import { getAgeText, getGenderText, getIntimacyText } from "./RelationModal/functions"
import styles from './RelationshipCreateContainer.module.scss'
import useRelationship from "./useRelationship"

const RelationshipCreateContainer = () => {
  const { name, instagram } = useRouter().query
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
  } = useRelationship()

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <p className={styles.title}>
            <strong>{name}님</strong>의 지인 목록 ({people.length}명)
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
        {people.length > 0
          ?
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
          :
          <p className={styles.emptyMessage}>
            지인을 추가해 주세요.
          </p>
        }
      </div>
      <div className={styles.buttonWrapper}>
        <MainButton onClick={handleSubmit}>
          분석 결과 확인하기
        </MainButton>
      </div>
      <RelationModal 
        updatePerson={updatePerson}
        inputPerson={targetPerson}
        open={openModal}
        onClose={closeModal}
      />
      <Toast 
        message={toastMessage}
        open={isToastOpened}
        onClose={() => setIsToastOpened(false)}
      />
      <LoadingModal open={isLoading}/>
    </div>
  )
}

export default RelationshipCreateContainer
