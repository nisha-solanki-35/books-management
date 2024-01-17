import React, { lazy, Suspense } from 'react'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
const Login = lazy(() => import('./Login'))

function LoginIndex () {
  return (
    <>
      <Header
        heading={'Nisha\'s Books Store'}
      />
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
      <Typography
        sx={{
          textAlign: 'center',
          margin: '15px 0'
        }}
      >
        {'Don\'t have an account?'}
        {' '}
        <Link to='/sign-up'>
          Sign up
        </Link>
      </Typography>
    </>
  )
}

export default LoginIndex
