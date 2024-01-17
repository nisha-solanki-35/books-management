import React, { Suspense } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'

interface PublicRouteProps {
  element: React.ComponentType<any>;
}

function PublicRoute ({ element: Component }: PublicRouteProps) {
  const token = localStorage.getItem('Token')
  const { pathname } = useLocation()

  if (token) {
    return (
      <Navigate to={
        pathname === '/' ||
        pathname === '/sign-in' ||
        pathname === '/sign-up'
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
