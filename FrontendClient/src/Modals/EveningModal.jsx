import { useEffect, useState, useContext } from 'react'
import Modal from 'react-modal';
import { eveningContext, signInContext } from "../Components/MyContexts";


function EveningPlan({ openDone, setOpenDone, closeDone}) {
    

const serverURL = import.meta.env.VITE_BACKEND_API_URL

const {eveningMessage, setEveningMessage, confirmedEveningMessage, setConfirmedEveningMessage} = useContext(eveningContext);
const {journalWriter, setJournalWriter} = useContext(signInContext);

function handleTextChange(event){
    setEveningMessage(event.target.value)
}

async function saveEvening() {
    setConfirmedEveningMessage(eveningMessage);
    closeDone();
    try {
      const response = await fetch(`${serverURL}/eveningdone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eveningMessage, journalWriter }), 
      });
  
      if (!response.ok) {
        console.log('error')
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

function handleKeyPress(event){
  if (event.key === 'Enter') {
    event.preventDefault();
    setEveningMessage(eveningMessage + '\n');
  }
}

//console.log(openPlan + ' open Plan in plan for morning chid')

  return (
    <>
    <div>
    <Modal 
        className = "enterMorning"
          isOpen={openDone}
          onRequestClose={closeDone}
          contentLabel="Custom Modal"
        >
          <div className = 'inputField'>
          <label htmlFor="myTextArea" className = 'titleInput'>WHAT DID YOU DO TODAY?</label>
          <textarea
            className = 'textarea'
            id="myTextArea"
            name="myTextArea"
            value={eveningMessage}
            onChange={handleTextChange}
            onKeyDown={handleKeyPress}
            rows="20"
            cols="50"
          ></textarea>
          <button 
          className = 'saveMorning' 
          onClick ={saveEvening}
          >Save</button>
          </div>
          <button onClick = {closeDone} >Close this Modal</button>
          </Modal>

    </div>
    </>
  )
}

export default EveningPlan



