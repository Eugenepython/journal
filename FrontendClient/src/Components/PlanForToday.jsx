import { useEffect, useState, useContext } from 'react'
import MorningPlan from '../Modals/MorningModal'

import { morningContext } from "../Components/MyContexts";



function PlanForToday() {

const [openPlan, setOpenPlan] = useState(false);

const {morningMessage, setMorningMessage, confirmedMessage, setConfirmedMessage} = useContext(morningContext);


function openMyPlan() {
    setOpenPlan(true);
    }

function closePlan(){
  setOpenPlan(false);
 // setMorningMessage('')
  }
//console.log(confirmedMessage )




  return (
    <>
    <div className = 'plan'>
    <div className = 'planTitle'>
    <div className = 'heading'>What are you going to do today?</div>
    <div className = 'buttonHolder'><button className = 'submitmorning' onClick = {openMyPlan}>Write your Plan</button></div>
    </div>
    <div className="planMessage" style={{ whiteSpace: 'pre-wrap' }}>
    {confirmedMessage}
    </div>


 
    <MorningPlan 
     openPlan={openPlan}
     setOpenPlan={setOpenPlan}
     closePlan={closePlan}
    />
    </div>
    </>
  )
}

export default PlanForToday


