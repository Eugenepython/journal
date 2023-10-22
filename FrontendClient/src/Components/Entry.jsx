import { useEffect, useState, useContext,  } from 'react'
import { signInContext, morningContext, eveningContext } from "../Components/MyContexts";


function Entry() {
    
const {theId, setTheId, token, setToken, showEntryForm, setShowEntryForm, loggedIn, signInResult, setSignInResult, setLogin, setJournalWriter, journalWriter, setShowLoginForm, setShowSignUpForm, setShowBackButton, showSignUpForm, showLoginForm, showBackButton} = useContext(signInContext);
const {setConfirmedMessage, morningMessage, setMorningMessage} = useContext(morningContext);
const {setConfirmedEveningMessage, eveningMessage, setEveningMessage} = useContext(eveningContext);


const [userInput, setUserInput] = useState('')
const [passwordInput, setPasswordInput] = useState('')
//const [showBackButton, setShowBackButton] = useState(false)
//const [signIn, setSignIn] = useState(false)
//const [showSignUpForm, setShowSignUpForm] = useState(false)
const [firstPassInput, setFirstPassInput] = useState('')
const [secondPassInput, setSecondPassInput] = useState('')
const [newUserInput, setNewUserInput] = useState('')
//const [showLoginForm, setShowLoginForm] =useState(false)
const [signUpResult, setSignUpResult] = useState(null)
//const [signInResult, setSignInResult] = useState(null)




function goBacktoEnter(){
  setShowEntryForm(false)
  setShowSignUpForm(false)
  setShowBackButton(false)
  setShowLoginForm(false)
  setSignUpResult(null)
  setSignInResult(null)
  setNewUserInput('')
  setFirstPassInput('')
  setSecondPassInput('')
}
    

function revealSignIn(){
    setShowEntryForm(true)
    setShowBackButton(true)
    setShowLoginForm(true)
}

function revealSignUp(){
  setShowEntryForm(true)
  setShowSignUpForm(true)
  setShowBackButton(true)
}

function getUserInput(event){
    //console.log(event.target.value)
    setUserInput(event.target.value)
}

function getNewUserInput(event){
  //console.log(event.target.value)
  setNewUserInput(event.target.value)
}

function getPasswordInput(event){
    //console.log(event.target.value)
    setPasswordInput(event.target.value)
}

function getFirstPassInput(event){
  //console.log(event.target.value)
  setFirstPassInput(event.target.value)
  //setFirstNewPass(event.target.value)
}

function getSecondPassInput(event){
  //console.log(event.target.value)
  setSecondPassInput(event.target.value)
}

const serverURL = import.meta.env.VITE_BACKEND_API_URL
//console.log(serverURL)

async function handleSubmitSignIn(event){
  event.preventDefault()
  //console.log(userInput)
  //console.log(passwordInput)
  setUserInput('')
  setPasswordInput('')
  try {
    const response = await fetch(`${serverURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userInput, password: passwordInput }),
    }); 
    if (!response.ok) {
        console.log(response);
    }
    const data = await response.json();
    //console.log('Data:', data);
    //console.log(data.message)
    if (data.message === 'No such user exists') {
      setSignInResult('No such user exists')
      return
    }
    if (data.message === 'Wrong password') {
      setSignInResult('Wrong password')
      return
    }
    if (data.message === 'You are logged in') {
      setSignInResult('You are logged in as ' + data.username)
      setShowLoginForm(false)
      console.log(data.token)
      setToken(data.token)
      setJournalWriter(data.username)
      setShowBackButton(false)
      setLogin(true)
      //console.log(data.morningMessage)
      setConfirmedMessage(data.morningMessage)
      setMorningMessage(data.morningMessage)
      setConfirmedEveningMessage(data.eveningMessage)
      setEveningMessage(data.eveningMessage)
      setTheId(data.id)
      return
    }
} catch (error) {
    console.error('Error:', error);
}
}




async function handleSubmitSignUp(event){
  event.preventDefault()
  //console.log(newUserInput)
  //console.log(firstPassInput)
  //console.log(secondPassInput)
  if(newUserInput === '' || firstPassInput === '' || secondPassInput === ''){
    setSignUpResult('please fill out all fields')
    return
  }
  if(firstPassInput !== secondPassInput){
    setSignUpResult('passwords do not match')
    return
  }
  if (firstPassInput.length < 8){
    setSignUpResult('password must be at least 8 characters')
    return
  }
  if (firstPassInput.length > 20){
    setSignUpResult('password must be less than 20 characters')
    return
  }
  if (newUserInput.length < 5){
    setSignUpResult('username must be at least 5 characters')
    return
  }
  try {
    const response = await fetch(`${serverURL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUserInput, password: firstPassInput }),
    }); 
    if (!response.ok) {
        console.log(response);
    }
    const data = await response.json();
    console.log('Data:', data);
      setSignUpResult(`Welcome, ${data.message}, Please log in to continue.`);
      setShowSignUpForm(false)
} catch (error) {
    console.error('Error:', error);
}
  setNewUserInput('')
  setFirstPassInput('')
  setSecondPassInput('')
}


  return (
    <>
    <div >
    {showEntryForm ? null :
    <div className = 'loginOrSignup'>
    <button onClick = {revealSignIn}>Sign In</button>
    <button onClick = {revealSignUp}>Sign Up</button>
    </div>}

    {showLoginForm ? <form className = 'forms' onSubmit={handleSubmitSignIn}>
    <h1>Log in with your details</h1>
    Enter username
    <input 
    className = 'inputBox'
      type="text"  
      name="textInput"
      onChange = {getUserInput}
      value = {userInput}
      >
    </input>
    Enter your password
    <input 
    className = 'inputBox'
      type="text"  
      name="textInput"
      onChange = {getPasswordInput}
      value = {passwordInput}
      >
    </input>
    <button className = 'submitSignIn' type="submit">Submit</button>
    </form> : null}
    {signInResult ? <div className = 'signedUp'>{signInResult}</div> : null}

    {showSignUpForm ? 
    <form className = 'forms' onSubmit={handleSubmitSignUp}>
    <h1>Enter new details</h1>
    Enter your unique username (at least 5 characters)
    <input className = 'inputBox'
      type="text"  
      name="textInput"
      onChange = {getNewUserInput}
      value = {newUserInput}
      >
    </input>  
    Enter your chosen password (at least 8 characters)
    <input 
      type="text"  
      name="textInput"
      onChange = {getFirstPassInput}
      value = {firstPassInput}
      >
    </input>
    Confirm your password 
    <input 
      type="text"  
      name="textInput"
      onChange = {getSecondPassInput}
      value = {secondPassInput}
      >
    </input>
    
    <button className = 'submitSignIn' type="submit">Submit</button>
    
    </form> : null}
    {signUpResult ? <div className = 'signedUp'>{signUpResult}</div> : null}
    {showBackButton ? <button className = 'backButton' onClick ={goBacktoEnter}>Back</button> : null}
    </div>

    </>
  )
}

export default Entry

