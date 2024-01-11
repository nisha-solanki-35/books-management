/* eslint-disable react/prop-types */
import { AppBar, Box, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Header (props) {
  const { heading } = props
  const { pathname } = useLocation()

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          textAlign: 'center',
          padding: '15px 0px'
        }}
      >
        <Typography
          sx={{ fontWeight: 'bold' }}
          variant="h5"
        >
          {heading}
        </Typography>
        {(pathname === '/sign-up') && (
        <Typography
          sx={{ fontWeight: 'bold' }}
        >
          Sign up to see your favorite books.
        </Typography>
        )}
      </AppBar>
    </Box>
  )
}
