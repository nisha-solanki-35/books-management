import React, { lazy, Suspense } from 'react'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
const Dashboard = lazy(() => import('./Dashboard'))

function DashboardIndex () {
  return (
    <>
      <Header
        heading="Books Management"
      />
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    </>
  )
}

export default DashboardIndex
