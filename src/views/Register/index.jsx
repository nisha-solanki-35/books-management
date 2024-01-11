import React, { lazy, Suspense } from 'react'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
const Registration = lazy(() => import('./Registration'))

function RegistrationIndex () {
  return (
    <>
      <Header
        heading={'Nisha\'s Books Store'}
      />
      <Suspense fallback={<Loader />}>
        <Registration />
      </Suspense>
    </>
  )
}

export default RegistrationIndex
