export default function formatTimestamp(data) {
    const year = data[0] + data[1] + data[2] + data[3];
    const month = data[5] + data[6];
    const day = data[8] + data[9];
    const formattedDate = `${day} ${getMonthName(month)} ${year}`;
  
    return {
      date: formattedDate,
      morningmessage: data.morningmessage,
      eveningmessage: data.eveningmessage,
    };
  }
  
  // Function to get the month name from a two-digit month representation
  function getMonthName(month) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[parseInt(month, 10) - 1];
  }
  