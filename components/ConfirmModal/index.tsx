import { Modal } from "@mui/material"
import styles from './ConfirmModal.module.scss'

interface ConfirmModalProps {
  open: boolean
  onClose: () => unknown
  title: string
  onConfirm: () => unknown
  content?: string | React.ReactNode
}

const ConfirmModal = ({
  open,
  onClose,
  title,
  content,
  onConfirm
}: ConfirmModalProps) => {
  return (
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
          <div>
            <p className={styles.title}>
              {title}
            </p>
          </div>
          {content && (
            <div className={styles.description}>
              {content}
            </div>
          )}
        </div>
        
        <div className={styles.buttonWrapper}>
          <button
            onClick={onClose}
            className={styles.back}
          >
            취소
          </button>
          <button
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </Modal> 
  )
}

export default ConfirmModal
