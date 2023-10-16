import { useState, useContext } from 'react'
import Header from './Components/Header'
import PlanForToday from './Components/PlanForToday'
import Recap from './Components/Recap'
import Entry from './Components/Entry'
import {signInContext} from './Components/MyContexts'



function App() {
 
  const [loggedIn, setLogin] = useState(false)
  const [journalWriter, setJournalWriter] = useState('')
  const [showLogOutButton, setShowLogOutButton] = useState(false)

  return (
    <>
    <div className='body'>
    
    <signInContext.Provider value={{loggedIn, setLogin, journalWriter, setJournalWriter}}>
    <Header  />
    <div style={{ display: loggedIn ? 'none' : 'block' }}> <Entry /> </div>
    <div style={{ display: loggedIn ? 'block' : 'none' }}>
    <PlanForToday />
    <Recap />
    </div>


    </signInContext.Provider>

    </div>
    </>
  )
}

export default App

