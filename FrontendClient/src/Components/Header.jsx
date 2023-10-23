import { useEffect, useState, useContext } from 'react'
import stoicGratitudeEnthusiasmQuotes from './Quotes';
import { signInContext } from "../Components/MyContexts";


const now = new Date();
const startOfYear = new Date(now.getFullYear(), 0, 0);
const dayOfYear = Math.floor((now - startOfYear) / 86400000); 

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);

 const randomNumber = Math.floor(Math.random() * stoicGratitudeEnthusiasmQuotes.length);
 const serverURL = import.meta.env.VITE_BACKEND_API_URL

function Header() {
    const {theId, setTheId, token, setToken, showEntryForm, setShowEntryForm, loggedIn, signInResult, setSignInResult, setLogin, setJournalWriter, journalWriter, setShowLoginForm, setShowSignUpForm, setShowBackButton, showSignUpForm, showLoginForm, showBackButton} = useContext(signInContext);
    
    const [quote, setQuote] = useState(stoicGratitudeEnthusiasmQuotes[randomNumber]);
    const [history, setHistory] = useState([])
    
    const quoteIndex = dayOfYear - 1;
//console.log(loggedIn + " !!!!!!!!!!!!!!!!!!!!!!!!")

    useEffect(() => {
    if (dayOfYear < 51) {
        setQuote(stoicGratitudeEnthusiasmQuotes[dayOfYear - 1]);
    } else if (dayOfYear > 51 && dayOfYear < 101) {
        setQuote(stoicGratitudeEnthusiasmQuotes[dayOfYear - 51]);
    } else if (dayOfYear > 101 && dayOfYear < 151) {
        setQuote(stoicGratitudeEnthusiasmQuotes[dayOfYear - 101]);
    } else if (dayOfYear > 151 && dayOfYear < 201) {
        setQuote(stoicGratitudeEnthusiasmQuotes[dayOfYear - 151]);
    } else if (dayOfYear > 201 && dayOfYear < 251) {
        setQuote(stoicGratitudeEnthusiasmQuotes[dayOfYear - 201]);
    } else if (dayOfYear > 251 && dayOfYear < 301) {
        setQuote(stoicGratitudeEnthusiasmQuotes[dayOfYear - 251]);
    } else if (dayOfYear > 301 && dayOfYear < 351) {
        setQuote(stoicGratitudeEnthusiasmQuotes[dayOfYear - 301]);
    } else if (dayOfYear > 351 && dayOfYear < 366) {
    setQuote(stoicGratitudeEnthusiasmQuotes[dayOfYear - 351]);
}
}, [dayOfYear]);


function logUserOut(){
    setLogin(false)
    setJournalWriter('')
    //console.log("logout")
    setSignInResult('')
    //setToken(null)
    //setShowLoginForm(true)
    setShowEntryForm(false)
    //setShowSignUpForm(true)
    //setShowBackButton(true)
}

async function showHistory(){
        try {
          const response = await fetch(`${serverURL}/memories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({journalWriter}), 
          });
          if (!response.ok) {
            console.log('error is annoying')
          } else {
            const data = await response.json();
            console.log(data[0]);
            setHistory(data)
          }
        } catch (error) {
          console.error('Eugenes Error:', error);
        }
      }

console.log(history)


  return (
    <>
    <div className = 'header'>
        <div className = 'title'>
                <div className = 'dateAndName'>
                    <p className = 'journalWriter'>{journalWriter}</p>
                    <p className = 'date'>{formattedDate}</p>
                </div>
                <p className = 'headTitle'>Journal</p>
                { loggedIn ? 
                <div className = 'logOutAndHistory'>
                    <button onClick = {logUserOut} className = 'logOut'>Log Out</button> 
                    <button onClick = {showHistory} className = 'history'>History</button>
                </div>
                : null }
        </div>
 
        <p>{quote}</p>

    </div>
    </>
  )
}

export default Header


