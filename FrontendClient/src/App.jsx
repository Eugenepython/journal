import { useState, useContext } from 'react'
import Header from './Components/Header'
import PlanForToday from './Components/PlanForToday'
import Recap from './Components/Recap'
import Entry from './Components/Entry'
import {signInContext} from './Components/MyContexts'



function App() {
 
  const [loggedIn, setLogin] = useState(false)
  const [journalWriter, setJournalWriter] = useState('')
  const [showBackButton, setShowBackButton] = useState(false)
const [showSignUpForm, setShowSignUpForm] = useState(false)
const [showLoginForm, setShowLoginForm] =useState(false)
const [signInResult, setSignInResult] = useState('')
const [showEntryForm, setShowEntryForm] = useState(false);



  
  return (
    <>
    <div className='body'>
    
    <signInContext.Provider value={{signInResult, setSignInResult, showEntryForm, setShowEntryForm, loggedIn, setLogin, journalWriter, setJournalWriter,  setShowLoginForm, setShowSignUpForm,  setShowBackButton,  showSignUpForm,  showLoginForm,  showBackButton }}>
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

