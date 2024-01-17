import React from 'react'
import { Link } from 'react-router-dom'

function NotFound (): JSX.Element {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h2>404 | This page could not be found.</h2>
      <Link
        to='/dashboard/books'
      >
        Go back to dashboard
      </Link>
    </div>
  )
}

export default NotFound
