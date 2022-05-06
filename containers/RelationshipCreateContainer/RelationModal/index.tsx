import { Modal, Radio } from "@mui/material"
import Toast from "components/Toast"
import { Gender, RelationshipAge, RelationshipIntimacy, RelationshipPerson } from "types/relationship"
import styles from './RelationModal.module.scss'
import useRelationModal from "./useRelationModal"

interface RelationModalProps {
  open: boolean
  onClose: () => unknown
  updatePerson: (person: RelationshipPerson) => unknown
  inputPerson?: RelationshipPerson
}

const RelationModal = ({
  open,
  onClose,
  inputPerson = {},
  updatePerson,
}: RelationModalProps) => {
  const {
    openToast,
    closeToast,
    handleClick,
    relation,
    setRelationByKey,
    step,
    reset,
    setStepBack,
    categoryOptions,
    onClickCategory,
    customCategoryMode,
    setCustomCategoryMode,
    customCategoryInput,
    setCustomCategoryInput,
    onClickCategoryInput,
  } = useRelationModal({
    inputPerson, 
    updatePerson,
    opened: open
  })

  const handleClose = () => {
    onClose()
    reset()
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={styles.container}>
          <div className={styles.contents}>
            <div className={styles.header}>
              <p className={styles.title}>
                {relation.name 
                  ? '지인 상세 정보'
                  : '지인 추가하기'}
              </p>
            </div>
            <div className={styles.step}>
              {step === 'info'
                ?
                <div>
                  <div className={styles.inputSet}>
                    <p>
                      이름을 알려주세요. *
                    </p>
                    <input 
                      placeholder="스스로 구별할 수 있다면 본명이 아니어도 되어요."
                      value={relation.name}
                      onChange={(event) => setRelationByKey('name', event.target.value)}
                    />
                  </div>
                  <div className={styles.inputSet}>
                    <p>
                      성별
                    </p>
                    <div>
                      <div onClick={() => setRelationByKey('gender', Gender.Male)}>
                        <Radio
                          checked={relation.gender === Gender.Male}
                          onChange={() => setRelationByKey('gender', Gender.Male)}
                          value="남"
                        />
                        남
                      </div>
                      <div onClick={() => setRelationByKey('gender', Gender.Female)}>
                        <Radio
                          checked={relation.gender === Gender.Female}
                          onChange={() => setRelationByKey('gender', Gender.Female)}
                          value="여"
                        />
                        여
                      </div>
                    </div>
                  </div>
                  <div className={styles.inputSet}>
                    <p>
                      친밀도
                    </p>
                    <div>
                      <div onClick={() => setRelationByKey('intimacy', RelationshipIntimacy.High)}>
                        <Radio
                          checked={relation.intimacy === RelationshipIntimacy.High}
                          onChange={() => setRelationByKey('intimacy', RelationshipIntimacy.High)}
                          value="상"
                        />
                        상
                      </div>
                      <div onClick={() => setRelationByKey('intimacy', RelationshipIntimacy.Middle)}>
                        <Radio
                          checked={relation.intimacy === RelationshipIntimacy.Middle}
                          onChange={() => setRelationByKey('intimacy', RelationshipIntimacy.Middle)}
                          value="중"
                        />
                        중
                      </div>
                      <div onClick={() => setRelationByKey('intimacy', RelationshipIntimacy.Low)}>
                        <Radio
                          checked={relation.intimacy === RelationshipIntimacy.Low}
                          onChange={() => setRelationByKey('intimacy', RelationshipIntimacy.Low)}
                          value="하"
                        />
                        하
                      </div>
                    </div>
                  </div>
                  <div className={styles.inputSet}>
                    <p>
                      나이대
                    </p>
                    <div>
                      <div onClick={() => setRelationByKey('age', RelationshipAge.Higher)}>
                        <Radio
                          checked={relation.age === RelationshipAge.Higher}
                          onChange={() => setRelationByKey('age', RelationshipAge.Higher)}
                          value="인생 선배"
                          defaultChecked={false}
                        />
                        인생 선배
                      </div>
                      <div onClick={() => setRelationByKey('age', RelationshipAge.Same)}>
                        <Radio
                          checked={relation.age === RelationshipAge.Same}
                          onChange={() => setRelationByKey('age', RelationshipAge.Same)}
                          value="또래"
                          defaultChecked={false}
                        />
                        또래
                      </div>
                      <div onClick={() => setRelationByKey('age', RelationshipAge.Lower)}>
                        <Radio
                          checked={relation.age === RelationshipAge.Lower}
                          onChange={() => setRelationByKey('age', RelationshipAge.Lower)}
                          value="인생 후배"
                          defaultChecked={false}
                        />
                        인생 후배
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div>
                  <div>
                    <p className={styles.categoryTitle}>
                      어디서 어울렸던 지인인가요?
                    </p>
                    <div className={styles.categoryBox}>
                      {categoryOptions.map((category) => (
                        <button
                          className={styles.category}
                          key={category}
                          onClick={() => onClickCategory(category)}
                        >
                          <input 
                            type="checkbox"
                            checked={relation.category?.includes(category)}
                          />
                          <p>
                            {category}
                          </p>
                        </button>
                      ))}
                    </div>
                    <div>
                      {customCategoryMode
                        ?
                        <div className={styles.customCategory}>
                          <input 
                            placeholder="카테고리를 입력해 주세요."
                            value={customCategoryInput}
                            onChange={(event) => setCustomCategoryInput(event.target.value)}
                          />
                          <button
                            onClick={onClickCategoryInput}
                          >
                            확인
                          </button>
                        </div>
                        :
                        <button
                          className={styles.add}
                          onClick={() => setCustomCategoryMode(true)}
                        >
                          + 직접 추가하기
                        </button>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          
          <div className={styles.buttonWrapper}>
            {step === 'category' && (
              <button
                onClick={setStepBack}
                className={styles.back}
              >
                이전
              </button>
            )}
            <button
              onClick={handleClick}
            >
              {step === 'category'
                ? '완료'
                : '다음'}
            </button>
          </div>
        </div>
      </Modal> 
      <Toast
        message="이름을 입력해 주세요."
        open={openToast}
        onClose={closeToast}
      />
    </>
  )
}

export default RelationModal
