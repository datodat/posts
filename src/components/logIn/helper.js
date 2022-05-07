export const usernameValidator = (username) => {
  if(username === '' || username.length < 4){
    return false;
  }else{
    return true;
  }
}

export const nameValidator = (name) => {
  if(name === '' || name.length < 2){
    return false;
  }else{
    return true;
  }
}

export const passwordValidator = (password) => {
  if(password === '' || password.length < 8){
    return false;
  }else{
    return true;
  }
}