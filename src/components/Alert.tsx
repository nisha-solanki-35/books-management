import React, { ReactElement } from 'react'
import Alert from '@mui/material/Alert'
import { Snackbar } from '@mui/material'

interface AlertComponentProps {
  success: boolean
  message: string
  alert: boolean
  setAlert: (type: boolean) => null
}

function AlertComponent (props: AlertComponentProps): ReactElement {
  const { success, message, alert, setAlert } = props

  return (
    <Snackbar
      key={'top' + 'right'}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      onClose={() => setAlert(false)}
      open={alert}
    >
      <Alert
        onClose={() => setAlert(false)}
        severity={success ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertComponent
