import React from 'react'
import { CircularProgress } from '@mui/material'

function Loader (): JSX.Element {
  return (
    <CircularProgress
      color="primary"
      variant="indeterminate"
    />
  )
}

export default Loader
