import { Modal } from "@mui/material"
import Toast from "components/Toast"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from './StartModal.module.scss'

interface StartModalProps {
  open: boolean
  onClose: () => unknown
}

const StartModal = ({
  open,
  onClose
}: StartModalProps) => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [instagramProfile, setInstagramProfile] = useState('')
  const [openToast, setOpenToast] = useState(false)
  
  const handleClick = () => {
    if (!name) {
      setOpenToast(true)
      return
    }
    router.push(`/relationship/create?name=${name}&instagram=${instagramProfile}`)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
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
                시작하기에 앞서...
              </p>
            </div>
            <div className={styles.form}>
              <div className={styles.inputSet}>
                <p>
                  이름을 알려주세요. *
                </p>
                <input 
                  placeholder="이름을 입력해 주세요."
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className={styles.inputSet}>
                <p>
                  인스타그램 계정
                </p>
                <input 
                  placeholder="맞팔로워를 불러올 인스타그램 계정명을 입력하세요."
                  value={instagramProfile}
                  onChange={(event) => setInstagramProfile(event.target.value)}
                />
              </div>
            </div>
            <div className={styles.message}>
              <p>
                - 계정 공개 범위가 공개인 경우에만 맞팔로워를 불러올 수 있습니다. 비공개 계정이라면 불러오기를 할 때만 잠시 공개로 전환해주세요.
              </p>
              <p>
                - 인스타그램 맞팔로워를 불러오지 않고 직접 지인들을 추가할 수 있습니다.
              </p>
            </div>
          </div>
          
          <div className={styles.buttonWrapper}>
            <button
              onClick={handleClick}
            >
              다음
            </button>
          </div>
        </div>
      </Modal>
      <Toast 
        message="이름을 입력해 주세요."
        open={openToast}
        onClose={() => setOpenToast(false)}
      />
    </>
  )
}

export default StartModal
