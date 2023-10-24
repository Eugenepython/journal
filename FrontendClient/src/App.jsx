import { useState, useContext } from 'react'
import Header from './Components/Header'
import PlanForToday from './Components/PlanForToday'
import Recap from './Components/Recap'
import Entry from './Components/Entry'
import MorningModal from './Modals/MorningModal'
import {signInContext, morningContext, eveningContext, historyContext} from './Components/MyContexts'
import WhatDoneToday from './Components/WhatDoneToday'
import EveningModal from './Modals/EveningModal'



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
const [eveningMessage, setEveningMessage] = useState('')
const [confirmedEveningMessage, setConfirmedEveningMessage] = useState('')
const [theId, setTheId] = useState('')
const [history, setHistory] = useState(null)
const [displayHistory, setDisplayHistory] = useState(false)
function closeHistory(){
  setDisplayHistory(false)
}
function openHistory(){
  setDisplayHistory(true)
}

  
  return (
    <>
    <div className='body'>
      <historyContext.Provider value = {{openHistory, closeHistory, history, setHistory, displayHistory, setDisplayHistory}}>
    <eveningContext.Provider value = {{confirmedEveningMessage, setConfirmedEveningMessage, eveningMessage, setEveningMessage}}>
    <morningContext.Provider value = {{morningMessage, setMorningMessage, confirmedMessage, setConfirmedMessage}}>
    <signInContext.Provider value={{
        theId, 
        setTheId,
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
    <EveningModal />
    <WhatDoneToday />
    
    </div>


    </signInContext.Provider>
    </morningContext.Provider>
    </eveningContext.Provider>
    </historyContext.Provider>

    </div>
    </>
  )
}

export default App

