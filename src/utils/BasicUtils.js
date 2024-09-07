export const setResumeValidity = (name, value) => {
     localStorage.setItem(name, value)
}

export const getResumeValidity = () => {
     return localStorage.getItem('summary') && 
     localStorage.getItem('experiences') && 
     localStorage.getItem('projects') && 
     localStorage.getItem('educations') && 
     localStorage.getItem('skills') &&
     localStorage.getItem('languages')  && 
     localStorage.getItem('additionalDetails')
}