import React, { lazy, Suspense } from 'react'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
const Login = lazy(() => import('./Login'))

function LoginIndex (props) {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    </>
  )
}

export default LoginIndex
