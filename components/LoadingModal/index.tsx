import { CircularProgress, Modal } from "@mui/material"
import styles from './LoadingModal.module.scss'

interface LoadingModalProps {
  open: boolean
  onClose?: () => unknown
}

const LoadingModal = ({
  open,
  onClose,
}: LoadingModalProps) => {
  return (
    <Modal
      onClose={onClose}
      open={open}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={styles.container}>
        <CircularProgress />
      </div>
    </Modal>
  )
}

export default LoadingModal
