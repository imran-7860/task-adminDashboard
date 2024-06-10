import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'

import AdminPage from './components/AdminPage'

import Home from './components/Home'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App