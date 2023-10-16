import { useEffect, useState, useContext } from 'react'
import stoicGratitudeEnthusiasmQuotes from './Quotes';
import { signInContext } from "../Components/MyContexts";


const now = new Date();
const startOfYear = new Date(now.getFullYear(), 0, 0);
const dayOfYear = Math.floor((now - startOfYear) / 86400000); 

 const randomNumber = Math.floor(Math.random() * stoicGratitudeEnthusiasmQuotes.length);

function Header() {
    const {loggedIn, setLogin, setJournalWriter, journalWriter} = useContext(signInContext);
    const [quote, setQuote] = useState(stoicGratitudeEnthusiasmQuotes[randomNumber]);
    const quoteIndex = dayOfYear - 1;


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



  return (
    <>
    <div className = 'header'>
    <h1>Journal Entry</h1>
    <p>{journalWriter}</p>
    <p>{quote}</p>

    </div>
    </>
  )
}

export default Header


