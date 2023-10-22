import { useEffect, useState, useContext } from 'react'
import EveningPlan from '../Modals/EveningModal'
import { eveningContext } from "../Components/MyContexts";


function WhatDoneToday() {

const [openDone, setOpenDone] = useState(false);
const {eveningMessage, setEveningMessage, confirmedEveningMessage, setConfirmedEveningMessage} = useContext(eveningContext);


function openMyDone(){
  setOpenDone(true)
}

function closeDone(){
  setOpenDone(false)
}


  return (
    <>
    <div className = 'recap'>
    <div className = 'planTitle'>
    <div className = 'heading'>What are did you do today?</div>
    <div className = 'buttonHolder'><button className = 'submitmorning' onClick = {openMyDone}>What did you do?</button></div>
    </div>
    <div className="planMessage" style={{ whiteSpace: 'pre-wrap' }}>
    {confirmedEveningMessage}
    </div>


  
    <EveningPlan
    openDone={openDone}
    setOpenDone={setOpenDone}
    closeDone={closeDone}
    />

    </div>
    </>
  )
}

export default WhatDoneToday


