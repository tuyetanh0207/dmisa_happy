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

export function createMessageForRegistration(currentMsg, isLock,actionName) {
  var message='';
  if (isLock===true){
    return currentMsg;
  }
  if (actionName==='Accept'){
    message = 'Your registration has been accepted, please review the contract and confirm it before continuing.'
  }
  if (actionName==='Reject'){
    message = 'Your registration has been rejected.'
  }
  if (actionName==='Revoke'){
    message = 'Your registration has been revoked'
  }
  return message;
}

export function createMessageForClaim(currentMsg, isLock,actionName) {
  var message='';
  if (isLock===true){
    return currentMsg;
  }
  if (actionName==='Accept'){
    message = 'Your registration has been accepted, please review the contract and confirm it before continuing.'
  }
  if (actionName==='Reject'){
    message = 'Your registration has been rejected.'
  }
  if (actionName==='Revoke'){
    message = 'Your registration has been revoked'
  }
  return message;
}