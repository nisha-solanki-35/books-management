import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AllRoutes from './routes/index'

const App = (): JSX.Element => {
  return (
    <Router>
      <AllRoutes />
    </Router>
  )
}

export default App
