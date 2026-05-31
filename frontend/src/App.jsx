import { useState } from 'react'
import Header from './Components/header'
import './App.css'
import ModalComponent from './Components/modal'

function App() {

  return (
    <>
     <Header />
      <section id="center">
        <ModalComponent />
      </section>
    </>
  )
}

export default App
