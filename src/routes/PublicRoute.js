import React, { Suspense } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'

function PublicRoute ({ element: Component }) {
  const token = localStorage.getItem('Token')
  const { pathname } = useLocation()

  if (token) {
    return (
      <Navigate to={
        pathname === '/login' ||
        pathname === '/'
          ? '/dashboard/books'
          : pathname}
      />
    )
  }
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  )
}

export default PublicRoute
