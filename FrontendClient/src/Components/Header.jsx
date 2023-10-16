import { useEffect, useState, useContext } from 'react'
import stoicGratitudeEnthusiasmQuotes from './Quotes';
import { signInContext } from "../Components/MyContexts";


const now = new Date();
const startOfYear = new Date(now.getFullYear(), 0, 0);
const dayOfYear = Math.floor((now - startOfYear) / 86400000); 

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);


 const randomNumber = Math.floor(Math.random() * stoicGratitudeEnthusiasmQuotes.length);

function Header() {
    const {showEntryForm, setShowEntryForm, loggedIn, signInResult, setSignInResult, setLogin, setJournalWriter, journalWriter, setShowLoginForm, setShowSignUpForm, setShowBackButton, showSignUpForm, showLoginForm, showBackButton} = useContext(signInContext);
    
    const [quote, setQuote] = useState(stoicGratitudeEnthusiasmQuotes[randomNumber]);
    
    const quoteIndex = dayOfYear - 1;
console.log(loggedIn + " !!!!!!!!!!!!!!!!!!!!!!!!")

    useEffect(() => {
    if (dayOfYear < 61) {
        setQuote(stoicGratitudeEnthusiasmQuotes[quoteIndex]);
    } else if (dayOfYear > 61 && dayOfYear < 121) {
        setQuote(stoicGratitudeEnthusiasmQuotes[quoteIndex - 61]);
    } else if (dayOfYear > 121 && dayOfYear < 182) {
        setQuote(stoicGratitudeEnthusiasmQuotes[quoteIndex - 121]);
    } else if (dayOfYear > 182 && dayOfYear < 243) {
        setQuote(stoicGratitudeEnthusiasmQuotes[quoteIndex - 182]);
    } else if (dayOfYear > 243 && dayOfYear < 304) {
        setQuote(stoicGratitudeEnthusiasmQuotes[quoteIndex - 243]);
    } else if (dayOfYear > 304 && dayOfYear < 367) {
        setQuote(stoicGratitudeEnthusiasmQuotes[quoteIndex - 304]);
    }
    }, [dayOfYear]);

  
console.log(journalWriter)

function logUserOut(){
    setLogin(false)
    setJournalWriter('')
    console.log("logout")
    setSignInResult('')
    //setShowLoginForm(true)
    setShowEntryForm(false)
    //setShowSignUpForm(true)
    //setShowBackButton(true)
}

  return (
    <>
    <div className = 'header'>
        <div className = 'title'>
            <div className = 'dateAndName'>
                <p>{journalWriter}</p>
                <p>{formattedDate}</p>
            </div>
        <h1>Journal</h1>
       { loggedIn ? <button onClick = {logUserOut} className = 'logOut'>Log Out</button> : null }
        </div>
 
        <p>{quote}</p>

    </div>
    </>
  )
}

export default Header


