export function calculateAge(dob) {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    
    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDate.getFullYear();
  
    // Check if the birthday has occurred this year
    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
}

export function createMessageForRegistration(currentMsg, isLock, actionName) {
  var message = '';
  if (isLock === true) {
    return currentMsg;
  }
  switch (actionName) {
    case 'Approved':
      message = 'Your registration has been accepted. Please review the contract and confirm it before continuing.';
      break;
    case 'Rejected':
      message = 'Your registration has been rejected.';
      break;
    case 'Revoked':
      message = 'Your registration has been revoked.';
      break;
    default:
      message = 'Your registration has just been updated by manager.';
  }
  return message;
}


export function createMessageForClaim(currentMsg, isLock, actionName) {
  var message = '';
  if (isLock === true) {
    return currentMsg;
  }
  switch (actionName) {
    case 'Approved':
      message = 'Your claim has been approved.';
      break;
    case 'Reject':
      message = 'Your claim has been rejected.';
      break;
    case 'Pending Review':
      message = 'Your claim is under review. Please wait for further updates.';
      break;
    case 'Pending Additional Information':
      message = 'Additional information is required for your claim. Please provide the necessary details.';
      break;
    case 'Process':
      message = 'Your claim is in process.';
      break;
    case 'Denied':
      message = 'Your claim has been denied.';
      break;
    case 'Payment Issued':
      message = 'Payment for your claim has been issued.';
      break;
    default:
      // Default message for unknown action
      message = 'Your claim has just been updated by manager.';
  }
  return message;
}


export const getAlphabetOfName = (name) => {
  if (name) {
    const arr = name.split(" ");
    return arr[arr.length - 1].charAt(0);
  } else {
    return "";
  }
};

export function NumberFormatExample(number) {
  if(number==null){
    return number;
  } else {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  }

}
