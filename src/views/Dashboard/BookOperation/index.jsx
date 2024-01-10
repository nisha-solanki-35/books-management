import React, { lazy, Suspense } from 'react'
import Header from '../../../components/Header'
import Loader from '../../../components/Loader'
const AddUpdateBook = lazy(() => import('./AddUpdateBook'))

function BookOperation () {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <AddUpdateBook />
      </Suspense>
    </>
  )
}

export default BookOperation
