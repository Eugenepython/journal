import { useEffect, useState, useContext } from 'react'
import Modal from 'react-modal';
import { historyContext } from "../Components/MyContexts";
import formatTimestamp from '../Modals/DateCalculator';


function HistoryModal({ }) {
    
const {openHistory, history, setHistory, displayHistory, setDisplayHistory, closeHistory} = useContext(historyContext);


const uniqueDates = new Set();


const combinedMessages = {};

history ? history.forEach(item => {
  uniqueDates.add(item.date);
  if (!combinedMessages[item.date]) {
    combinedMessages[item.date] = {
      morningmessage: item.morningmessage || '',
      eveningmessage: item.eveningmessage || '',
    };
  } else {
    if (item.morningmessage) {
      combinedMessages[item.date].morningmessage = item.morningmessage;
    }
    if (item.eveningmessage) {
      combinedMessages[item.date].eveningmessage = item.eveningmessage;
    }
  }
}) : null;

const uniqueDatesArray = [...uniqueDates];
const combinedHistory = uniqueDatesArray.map(date => ({
  date,
  ...combinedMessages[date],
}));

//console.log(combinedHistory.length + ' combined history length');

const formattedHistory = combinedHistory.map(item => ({
    date: formatTimestamp(item.date),
    morningmessage: item.morningmessage,
    eveningmessage: item.eveningmessage,
  }));
  
  //formattedHistory ? console.log(formattedHistory[0].date.date) : null;

const historyShow = formattedHistory ?  formattedHistory.map (item => {
    return (
        <div className = 'historyItem'>
        <p>{item.date.date}</p>
        <div className = 'historyMorning'>
        <p>Day Aims</p>
        <p style={{ whiteSpace: 'pre-wrap' }}> {item.morningmessage}</p>
        </div>
        <div className = 'historyEvening'>
        <p>Day Achievements</p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{item.eveningmessage}</p>
        </div>
        </div>
    )
}) : null;



  return (
    <>
    <div>
    <Modal 
        className = "modal"
          isOpen={displayHistory}
          onRequestClose={closeHistory}
          contentLabel="Custom Modal"
        >
           {historyShow}
     <button className = 'closeModal' onClick = {closeHistory}>Close</button>
          </Modal>

    </div>
    </>
  )
}

export default HistoryModal



