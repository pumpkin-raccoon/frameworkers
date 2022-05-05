import { Alert, Snackbar } from '@mui/material'

interface ToastProps {
  message: string
  open: boolean
  onClose: () => unknown
  type?: 'success' | 'error'
}

const Toast = ({
  message,
  open,
  onClose,
  type = 'error',
}: ToastProps) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={3000} 
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
    >
      <Alert 
        onClose={onClose} 
        severity={type}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
