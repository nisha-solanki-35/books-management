import React, { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../../components/Header'
import Loader from '../../../components/Loader'
const AddUpdateBook = lazy(() => import('./AddUpdateBook'))

function BookOperation () {
  const { pathname } = useLocation()

  return (
    <>
      <Header
        heading={pathname.includes('/add-book') ? 'Add Book' : 'Edit Book Details'}
      />
      <Suspense fallback={<Loader />}>
        <AddUpdateBook />
      </Suspense>
    </>
  )
}

export default BookOperation
