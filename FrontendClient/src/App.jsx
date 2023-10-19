import { useState, useContext } from 'react'
import Header from './Components/Header'
import PlanForToday from './Components/PlanForToday'
import Recap from './Components/Recap'
import Entry from './Components/Entry'
import MorningModal from './Modals/MorningModal'
import {signInContext, morningContext} from './Components/MyContexts'



function App() {
 
  const [loggedIn, setLogin] = useState(false)
  const [journalWriter, setJournalWriter] = useState('')
  const [showBackButton, setShowBackButton] = useState(false)
const [showSignUpForm, setShowSignUpForm] = useState(false)
const [showLoginForm, setShowLoginForm] =useState(false)
const [signInResult, setSignInResult] = useState('')
const [showEntryForm, setShowEntryForm] = useState(false);
const [token, setToken] = useState(null)
const [morningMessage, setMorningMessage] = useState('')
const [confirmedMessage, setConfirmedMessage] = useState('')

  




  return (
    <>
    <div className='body'>
    
    <morningContext.Provider value = {{morningMessage, setMorningMessage, confirmedMessage, setConfirmedMessage}}>
    <signInContext.Provider value={{
        token,
        setToken, 
        signInResult, 
        setSignInResult, 
        showEntryForm, 
        setShowEntryForm, 
        loggedIn, 
        setLogin, 
        journalWriter, 
        setJournalWriter,  
        setShowLoginForm, 
        setShowSignUpForm,  
        setShowBackButton,  
        showSignUpForm,  
        showLoginForm,
        showBackButton 
         }}>
    <Header  />
    <div style={{ display: loggedIn ? 'none' : 'block' }}> <Entry /> </div>
    <div style={{ display: loggedIn ? 'block' : 'none' }}>
    <MorningModal />
    <PlanForToday  />
    <Recap />
    </div>


    </signInContext.Provider>
    </morningContext.Provider>

    </div>
    </>
  )
}

export default App

