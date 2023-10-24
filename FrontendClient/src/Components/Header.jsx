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


app.post('/memories', (req, res) => {
  const username = req.body.journalWriter;
  pool.query('SELECT * FROM users WHERE username = $1', [username], (err, userResult) => {
    if (err) {
      console.error('Error executing query on username:', err);
      res.status(500).json({ message: 'Database query error' });
    } else if (userResult.rows.length > 0) {
      const user_id = userResult.rows[0].user_id;
 
      pool.query(
        'SELECT * FROM morningplan WHERE user_id = $1 ORDER BY timestamp_column DESC LIMIT 1',
        [user_id],
        (err, morningplanResult) => {
          if (err) {
            console.error('Error executing query on morningplan:', err);
            res.status(500).json({ message: 'Database query error' });
          } else if (morningplanResult.rows.length > 0) {
            // Step 2: Insert the latest entry from morningplan into memories
            const latestMorningplanEntry = morningplanResult.rows[0];
            pool.query(
              'INSERT INTO memories (user_id, date, morningmessage) VALUES ($1, $2, $3)',
              [user_id, latestMorningplanEntry.date, latestMorningplanEntry.message],
              (err) => {
                if (err) {
                  console.error('Error inserting data into memories:', err);
                  res.status(500).json({ message: 'Database query error' });
                } else {
                  // Step 3: Respond with the inserted data
                  res.status(200).json({ message: 'Latest entry saved to memories', data: latestMorningplanEntry });
                }
              }
            );
          } else {
            res.status(404).json({ message: 'No morningplan entry found for the user.' });
          }
        }
      );
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  });
});


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


