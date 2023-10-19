import { useEffect, useState, useContext } from 'react'
import Modal from 'react-modal';
import { morningContext, signInContext } from "../Components/MyContexts";


function MorningPlan({ openPlan, setOpenPlan, closePlan}) {

const serverURL = import.meta.env.VITE_BACKEND_API_URL

const {morningMessage, setMorningMessage, confirmedMessage, setConfirmedMessage} = useContext(morningContext);
const {journalWriter, setJournalWriter} = useContext(signInContext);

function handleTextChange(event){
setMorningMessage(event.target.value)
}



async function saveMorning() {
  setConfirmedMessage(morningMessage);
  closePlan();
  try {
    const response = await fetch(`${serverURL}/morningplan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ morningMessage, journalWriter }), 
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



//console.log(openPlan + ' open Plan in plan for morning chid')

  return (
    <>
    <div>
    <Modal 
        className = "enterMorning"
          isOpen={openPlan}
          onRequestClose={closePlan}
          contentLabel="Custom Modal"
        >
          <div className = 'inputField'>
          <label htmlFor="myTextArea" className = 'titleInput'>What are you doing to do today?</label>
          <textarea
            className = 'textarea'
            id="myTextArea"
            name="myTextArea"
            value={morningMessage}
            onChange={handleTextChange}
            rows="20"
            cols="50"
          ></textarea>
          <button onClick ={saveMorning}>Save</button>
          </div>
          <button onClick = {closePlan} >Close this Modal</button>
          </Modal>

    </div>
    </>
  )
}

export default MorningPlan



