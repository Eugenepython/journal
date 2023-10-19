import { useEffect, useState, useContext } from 'react'
import MorningPlan from '../Modals/MorningModal'

import { morningContext } from "../Components/MyContexts";



function PlanForToday() {

const [openPlan, setOpenPlan] = useState(false);

const {morningMessage, setMorningMessage, confirmedMessage, setConfirmedMessage} = useContext(morningContext);


function openMyPlan() {
    setOpenPlan(true);
    }
//console.log(openPlan + ' open Plan in plan for tdoay parent')

function closePlan(){
  setOpenPlan(false);
 // setMorningMessage('')
  }

  return (
    <>
    <div className = 'plan'>
    <div className = 'heading'>What are you going to do today?</div>

    <div className = 'buttonHolder'><button className = 'submitmorning' onClick = {openMyPlan}>Write your Plan</button></div>
    <div className = 'planMessage'>{confirmedMessage}</div>
 
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


