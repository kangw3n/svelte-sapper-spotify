export const accessToken = 'BQCTWgZs4Ixua81xpMgOlvi5EhcjQO_O01dOAxRFmXRjIdX4KNju4WhDGoGWrip5_Oclr5e3rrKbqdbwHpY';

export const debounce = (func, timer) => {
  let timeId = null;
  return (...args) => {
    if(timeId){
      clearTimeout(timeId);
    }
    timeId = setTimeout(()=> {
      func(...args);
    }, timer);
  };
};


export const msMinute = (millseconds) => {
  var seconds = Math.floor(millseconds / 1000);
  var days = Math.floor(seconds / 86400);
  var hours = Math.floor((seconds % 86400) / 3600);
  var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
  var timeString = '';


  if (days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
  if (hours > 0) timeString += (hours > 1) ? (hours + " hours ") : (hours + " hour ");
  if (minutes >= 0) timeString += (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");
  return timeString;
};

