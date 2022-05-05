import classNames from "classnames"
import MainButton from "components/button/MainButton"
import { useRouter } from "next/router"
import { Gender, Relationship, RelationshipAge } from "types/relationship"
import RelationModal from "./RelationModal"
import { getAgeText, getGenderText, getIntimacyText } from "./RelationModal/functions"
import styles from './RelationshipResultContainer.module.scss'
import useRelationship from "./useRelationship"

const RelationshipResultContainer = () => {
  const { name, instagram } = useRouter().query
  const {
    relations,
    targetRelation,
    addRelation,
    openModal,
    updateRelationship,
    closeModal,
    removeRelation,
    hasInformation,
    openTargetRelation,
  } = useRelationship()

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <p className={styles.title}>
            {name}의 지인 목록 ({relations.length}명)
          </p>
          <button 
            className={styles.add}
            onClick={addRelation}
          >
            + 직접 추가하기
          </button>
        </div>
      </div>
      <div className={classNames([
        styles.box,
        {[styles.empty]: relations.length === 0}
      ])}>
        {relations.length > 0
          ?
          <div>
            {relations.map((relation: Relationship, index: number) => (
              <div
                key={index}
                className={styles.relation}
                onClick={() => openTargetRelation(index)}
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
                      removeRelation(index)
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
        <MainButton onClick={() => {}}>
          분석 결과 확인하기
        </MainButton>
      </div>
      <RelationModal 
        updateRelation={updateRelationship}
        inputRelation={targetRelation}
        open={openModal}
        onClose={closeModal}
      />
    </div>
  )
}

export default RelationshipResultContainer
