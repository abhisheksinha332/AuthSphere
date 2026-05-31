import { useState } from 'react'
import Header from './Components/header'
import './App.css'
import ModalComponent from './Components/modal'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Background2 from './Components/background2'
import Background1 from './Components/background1'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  return (
    <Router>
       <Header setIsAuthenticated={setIsAuthenticated} />
      <Routes>
       <Route
          path="/"
          element={
            <>
            {isAuthenticated ? (
              <Background2 />
            ) : (
              <Background1 />
            )}
            <section id="center">
              <ModalComponent />
            </section>
          </>
          }
        />
        <Route path="/section2" element={<Background2 />} />
        {/* Add more routes as needed */}
      </Routes>
      <section id="center">
        <ModalComponent />
      </section>
    </Router>
  )
}

export default App
