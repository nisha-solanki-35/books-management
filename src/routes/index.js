import React, { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
const PublicRoute = lazy(() => import('./PublicRoute'))
const PrivateRoute = lazy(() => import('./PrivateRoute'))
const Login = lazy(() => import('../views/Login/index'))
const Dashboard = lazy(() => import('../views/Dashboard/index'))
const BookOperation = lazy(() => import('../views/Dashboard/BookOperation/index'))
const NotFound = lazy(() => import('../components/NotFound'))

export default function Router () {
  return useRoutes([
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/dashboard/books" /> },
        { path: '/404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '/login', element: <PublicRoute element={Login} /> },
    { path: '/dashboard/books', element: <PrivateRoute element={Dashboard} /> },
    {
      path: '/books',
      children: [
        { path: 'add-book', element: <PrivateRoute element={BookOperation} /> },
        { path: 'update-book', element: <PrivateRoute element={BookOperation} /> }
      ]
    },
    {
      path: '*',
      element: <Navigate replace to="/404" />
    }
  ])
}