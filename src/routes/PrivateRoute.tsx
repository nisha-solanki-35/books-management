import React, { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import Loader from '../components/Loader'

interface PrivateRouteProps {
  element: React.ComponentType<any>
}

function PrivateRoute ({ element: Component }: PrivateRouteProps): JSX.Element {
  const token = localStorage.getItem('Token')

  if (!token) return <Navigate replace to='/sign-in' />
  
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  )
}

export default PrivateRoute
