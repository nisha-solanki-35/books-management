/* eslint-disable react/prop-types */
import React, { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import Loader from '../components/Loader'

function PrivateRoute ({ element: Component }) {
  const token = localStorage.getItem('Token')

  if (!token) return <Navigate replace to='/sign-in' />
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  )
}

export default PrivateRoute
