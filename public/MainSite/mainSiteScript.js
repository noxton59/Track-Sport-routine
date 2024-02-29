let loggedUser = "";
let savedPass = "";
let routineList;
let rememberMeBool = false;
checkLoggedUser();
const filter = document.querySelector('.js-filter');

// Registration and login form JS
document.querySelector(".register-btn-js").addEventListener('click', regForm);
document.querySelector(".login-btn").addEventListener("click", loginForm);

function regForm() {
  const regForm = document.createElement("div");
  regForm.classList.add("reg-form");
  const formField = document.createElement("div");
  formField.classList.add("form-field");
  const enterInfo = document.createElement("div");
  enterInfo.classList.add("enter-info");
  enterInfo.textContent = "Enter your information:"
  const dataField = document.createElement("div");
  dataField.classList.add("data-field");
  const regFormCloseBtn = document.createElement("button");
  regFormCloseBtn.classList.add("reg-form-close-btn");
  regFormCloseBtn.textContent = "X";
  const regLoginLabel = document.createElement("label");
  regLoginLabel.classList.add("input-label");
  regLoginLabel.textContent = "Login:";
  regLoginLabel.htmlFor = "reg-login";
  const regLoginInput = document.createElement("input");
  regLoginInput.id = "reg-login";
  regLoginInput.name = "login";
  regLoginInput.classList.add("reg-field", "login-field-reg-js");
  regLoginInput.required = true;
  regLoginInput.type = "text";
  const regFirstNameLabel = document.createElement("label");
  regFirstNameLabel.classList.add("input-label");
  regFirstNameLabel.textContent = "First name:";
  regFirstNameLabel.htmlFor = "first-name";
  const regFirstNameInput = document.createElement("input");
  regFirstNameInput.id = "first-name";
  regFirstNameInput.name = "first-name";
  regFirstNameInput.classList.add("reg-field", "first-name-reg-js");
  regFirstNameInput.required = true;
  regFirstNameInput.type = "text";
  const regSecondNameLabel = document.createElement("label");
  regSecondNameLabel.classList.add("input-label");
  regSecondNameLabel.textContent = "Second name:";
  regSecondNameLabel.htmlFor = "second-name";
  const regSecondNameInput = document.createElement("input");
  regSecondNameInput.id = "second-name";
  regSecondNameInput.name = "second-name";
  regSecondNameInput.classList.add("reg-field", "second-name-reg-js");
  regSecondNameInput.required = true;
  regSecondNameInput.type = "text";
  const regPasswordLabel = document.createElement("label");
  regPasswordLabel.classList.add("input-label");
  regPasswordLabel.textContent = "Password:";
  regPasswordLabel.htmlFor = "password";
  const regPasswordInput = document.createElement("input");
  regPasswordInput.id = "password";
  regPasswordInput.name = "password";
  regPasswordInput.classList.add("reg-field", "fpassword-reg-js");
  regPasswordInput.required = true;
  regPasswordInput.type = "password";
  const regSecPasswordLabel = document.createElement("label");
  regSecPasswordLabel.classList.add("input-label");
  regSecPasswordLabel.textContent = "Repeat password:";
  regSecPasswordLabel.htmlFor = "sec-password";
  const regSecPasswordInput = document.createElement("input");
  regSecPasswordInput.id = "sec-password";
  regSecPasswordInput.name = "sec-password";
  regSecPasswordInput.classList.add("reg-field", "spassword-reg-js");
  regSecPasswordInput.required = true;
  regSecPasswordInput.type = "password";
  const regWarning = document.createElement("div");
  regWarning.classList.add("reg-warning", "reg-warning-js");
  const regFormSubmitBtn = document.createElement("button");
  regFormSubmitBtn.classList.add("register-button", "register-button-js");
  regFormSubmitBtn.type = "submit";
  regFormSubmitBtn.textContent = "Register";
  const haveAccDiv = document.createElement("div");
  haveAccDiv.classList.add("have-account");
  haveAccDiv.textContent = "Already have an account?";
  const signInBtn = document.createElement("span");
  signInBtn.classList.add("sign-in-btn", "sign-in-btn-js");
  signInBtn.textContent = "Sign in";
  
  dataField.append(regLoginLabel, regLoginInput, regFirstNameLabel, regFirstNameInput, regSecondNameLabel, regSecondNameInput, regPasswordLabel, regPasswordInput, regSecPasswordLabel, regSecPasswordInput);
  formField.append(regFormCloseBtn, enterInfo, dataField, regWarning, regFormSubmitBtn, haveAccDiv);
  haveAccDiv.append(signInBtn);
  regForm.append(formField)
  document.body.append(regForm);

  regFormCloseBtn.addEventListener("click", () => {
    document.body.removeChild(regForm);
  });

  regFormSubmitBtn.addEventListener("click", () => {
    createUser(regForm, regWarning)
  });

  signInBtn.addEventListener("click", () => {
    document.body.removeChild(regForm);
    loginForm();
  });
}

let timeOutRegWarning;
function regWarningShow(regWarning) {
  regWarning.classList.add("is-shown");
  regWarning.classList.add("fade-in");
  if (regWarning.classList.contains("fade-in")) {
    regWarning.classList.remove("fade-in");
    requestAnimationFrame(()=>{
      regWarning.classList.add("fade-in");
    })
  }
  clearTimeout(timeOutRegWarning);
  timeOutRegWarning = setTimeout(()=>{regWarning.classList.remove("is-shown")}, 2900);
}

async function createUser(regForm, regWarning) {
  const login = document.querySelector(".login-field-reg-js");
  let loginValue = login.value;
  const firstName = document.querySelector(".first-name-reg-js");
  let firstNameValue = firstName.value;
  const secondName = document.querySelector(".second-name-reg-js");
  let secondNameValue = secondName.value;
  const fpassword = document.querySelector(".fpassword-reg-js");
  let fpasswordValue = fpassword.value;
  const spassword = document.querySelector(".spassword-reg-js");
  let spasswordValue = spassword.value;
  
  if (loginValue == "" || firstNameValue == "" || secondNameValue == "" || fpasswordValue == "" || spasswordValue == "") {
    regWarning.textContent = "Fill all fields!";
    regWarningShow(regWarning);
  }
  else {
    if (fpasswordValue === spasswordValue) {
       if (await checkLogin(loginValue)) {
        regWarning.textContent = "This login already exists!";
        regWarningShow(regWarning);
      } else {
        regWarning.classList.remove("is-shown");
        addUser(loginValue, firstNameValue, secondNameValue, spasswordValue, regForm);
      }
    } else {
      regWarning.textContent = "Passwords don't match!";
      regWarningShow(regWarning);
      return
    }
  }
}

async function addUser(loginValue, firstNameValue, secondNameValue, spasswordValue, regForm) {
  const data = {login: loginValue, firstName: firstNameValue, secondName: secondNameValue, password: spasswordValue, routine: []};
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  const response = await fetch("/api/addUser", options);
  const responseJson = await response.json();

  const regSuccessBg = document.createElement("div");
  regSuccessBg.classList.add("reg-success-bg");
  if (responseJson === "success") {
    const regSuccess = document.createElement("div");
    regSuccess.classList.add("reg-success", "reg-success-js");
    regSuccess.textContent = "Registration successfully completed";
    regSuccessBg.append(regSuccess);
    document.body.removeChild(regForm);
    document.body.append(regSuccessBg);
    setTimeout(()=>{document.body.removeChild(regSuccessBg)}, 1400);
  } else {
    const regGoneWrong = document.createElement("div");
    regGoneWrong.classList.add("reg-gone-wrong");
    regGoneWrong.textContent = `Something went wrong, try again. ${responseJson}`;
    regSuccessBg.append(regGoneWrong);
    document.body.removeChild(regForm);
    document.body.append(regSuccessBg);
    setTimeout(()=>{document.body.removeChild(regSuccessBg)}, 1400);
  }
}

function loginForm () {
  const loginField = document.createElement("div");
  loginField.classList.add("login-field");
  const loginForm = document.createElement("div");
  loginForm.classList.add("login-form");
  const loginFormCloseBtn = document.createElement("button");
  loginFormCloseBtn.classList.add("login-form-close-btn");
  loginFormCloseBtn.textContent = "X";
  const loginInfo = document.createElement("div");
  loginInfo.classList.add("login-info");
  loginInfo.textContent = "Enter your login and password:";
  const loginFormField = document.createElement("div");
  loginFormField.classList.add("login-form-field");
  const loginLoginLabel = document.createElement("label");
  loginLoginLabel.classList.add("login-input-label");
  loginLoginLabel.textContent = "Login:";
  loginLoginLabel.htmlFor = "log-login";
  const loginLoginInput = document.createElement("input");
  loginLoginInput.id = "log-login";
  loginLoginInput.name = "login";
  loginLoginInput.classList.add("log-field", "login-input-log-js");
  loginLoginInput.required = true;
  loginLoginInput.type = "text";
  const loginPasswordLabel = document.createElement("label");
  loginPasswordLabel.classList.add("login-input-label");
  loginPasswordLabel.textContent = "Password:";
  loginPasswordLabel.htmlFor = "log-password";
  const loginPasswordInput = document.createElement("input");
  loginPasswordInput.id = "log-password";
  loginPasswordInput.name = "password";
  loginPasswordInput.classList.add("log-field", "password-input-log-js");
  loginPasswordInput.required = true;
  loginPasswordInput.type = "password";
  const rememberField = document.createElement("div");
  rememberField.classList.add("remember-field");
  const rememberMeLabel = document.createElement("label");
  rememberMeLabel.htmlFor = "remember-me";
  rememberMeLabel.textContent = "Remember Me:";
  const rememberMeInput = document.createElement("input");
  rememberMeInput.type = "checkbox";
  rememberMeInput.id = "remember-me";
  const loginFormSubmitBtn = document.createElement("button");
  loginFormSubmitBtn.classList.add("login-btn-form", "login-btn-log-js");
  loginFormSubmitBtn.textContent = "Login";
  loginFormSubmitBtn.type = "submit";
  const loginFormRegisterBtn = document.createElement("div");
  loginFormRegisterBtn.classList.add("reg-form-btn", "reg-form-btn-js");
  loginFormRegisterBtn.textContent = "Register";
  const logWarning = document.createElement("div");
  logWarning.classList.add("log-warning");
  loginFormField.append(loginLoginLabel, loginLoginInput, loginPasswordLabel, loginPasswordInput);
  rememberField.append(rememberMeLabel, rememberMeInput);
  loginForm.append(loginFormCloseBtn, loginInfo, loginFormField, rememberField, loginFormSubmitBtn, loginFormRegisterBtn, logWarning);
  loginField.append(loginForm);
  document.body.append(loginField);

  loginFormCloseBtn.addEventListener("click", () => {
    document.body.removeChild(loginField)
  });

  loginFormSubmitBtn.addEventListener("click", () => {
    logIn(rememberMeInput, loginField, logWarning);
  });

  loginFormRegisterBtn.addEventListener("click", () => {
    document.body.removeChild(loginField);
    regForm();
  })
}
//style no user, wrong pass, etc...
let timeOutLogWarning;
function LogWarningShow(logWarning) {
  logWarning.classList.add("is-shown");
  logWarning.classList.add("fade-in");
  if (logWarning.classList.contains("fade-in")) {
    logWarning.classList.remove("fade-in");
    requestAnimationFrame(()=>{
      logWarning.classList.add("fade-in");
    })
  }
  clearTimeout(timeOutRegWarning);
  timeOutRegWarning = setTimeout(()=>{logWarning.classList.remove("is-shown")}, 2900);
}
async function logIn(rememberMeInput, loginField, logWarning) {
  const userLoginInput = document.querySelector(".login-input-log-js");
  let userLogin = userLoginInput.value;
  const userPasswordInput = document.querySelector(".password-input-log-js");
  let userPassword = userPasswordInput.value;
  const options = {
    method: "GET"
  }
  const request = await fetch(`/api/${userLogin}&${userPassword}`, options);
  const json = await request.json();

  if (json === "no user") {
    logWarning.textContent = "User with such login doesn't exists!";
    LogWarningShow(logWarning);
  } else if (json[0] === "match") {
    const userFirstName = json[2];
    const userSecondName = json[3];
    loggedUser = json[1];  
    routineList = json[4];
    const loggedSuccessField = document.createElement("div");
    loggedSuccessField.classList.add("logged-success-field", "is-shown");
    const loggedSuccess = document.createElement("div");
    loggedSuccess.classList.add("logged-success");
    loggedSuccess.textContent = `Welcome ${userFirstName} ${userSecondName}`;
    loggedSuccessField.append(loggedSuccess);
    document.body.removeChild(loginField);
    document.body.append(loggedSuccessField);
    setTimeout(() => {
      document.body.removeChild(loggedSuccessField);
    }, 1400);
    loggedUserMenu(userFirstName, userSecondName);
    renderRoutine(routineList.sort(compareDate));
    if (rememberMeInput.checked) {
      savedPass = userPassword;
      rememberMeBool = true;
      localStorage.setItem("loggedUser", JSON.stringify([loggedUser, savedPass, rememberMeBool]));
    }
  } else if (json === "wrong password") {
    logWarning.textContent = "Wrong password!";
    LogWarningShow(logWarning);
  }
}

async function checkLoggedUser() {
  const savedUser = JSON.parse(localStorage.getItem("loggedUser")) || "";
  if (savedUser === "") {
    return;
  }
  else {
    loggedUser = savedUser[0];
    const pass = savedUser[1];
    rememberMeBool = savedUser[2];
    const options = {
      method: "GET"
    }
    const request = await fetch(`/api/${loggedUser}&${pass}`, options);
    const json = await request.json();
    const userFirstName = json[2];
    const userSecondName = json[3];
    loggedUser = json[1];   
    routineList = json[4];
    loggedUserMenu(userFirstName, userSecondName);
    renderRoutine(routineList.sort(compareDate));
  }
}

let isMenuVisible = false;
let timeOutPassWarning;
function passWarningShow(passWarning) {
  passWarning.classList.add("is-shown");
  passWarning.classList.add("fade-in");
  if (logWarning.classList.contains("fade-in")) {
    logWarning.classList.remove("fade-in");
    requestAnimationFrame(()=>{
      logWarning.classList.add("fade-in");
    })
  }
  clearTimeout(timeOutRegWarning);
  timeOutRegWarning = setTimeout(()=>{logWarning.classList.remove("is-shown")}, 2900);
}

function loggedUserMenu(userFirstName, userSecondName) {
  let userName;
  if (userFirstName.length > 12 || userSecondName.length > 12) {
    userName = `${userFirstName.slice(0, 12)}... ${userSecondName.slice(0, 12)}...`;
  } else {
    userName = `${userFirstName} ${userSecondName}`;
  }
  const regLogField = document.querySelector(".reg-log-field");
  const registerBtn = document.querySelector(".register-btn");
  const loginBtn = document.querySelector(".login-btn");
  const userNameField = document.createElement("div");
  userNameField.textContent = userName;
  userNameField.classList.add("user-name-field");
  const userNameMenu = document.createElement("div");
  userNameMenu.classList.add("user-name-menu");
  const changePass = document.createElement("div");
  changePass.textContent = "Change password";
  changePass.classList.add("change-pass");
  const deleteAccount = document.createElement("div");
  deleteAccount.classList.add("delete-account", "delete-account-js");
  deleteAccount.textContent = "Delete Account";
  const deleteHistory = document.createElement("div");
  deleteHistory.classList.add("delete-history", "delete-history-js");
  deleteHistory.textContent = "Delete training history";
  const logOut = document.createElement("div");
  logOut.classList.add("log-out", "log-out-js");
  logOut.textContent = "Log out";
  userNameMenu.append(changePass, deleteAccount, deleteHistory, logOut);
  regLogField.append(userNameField, userNameMenu);
  regLogField.removeChild(registerBtn);
  regLogField.removeChild(loginBtn);

  document.querySelector(".change-pass").addEventListener("click", async () => {
    const parentPassField = document.createElement("div");
    parentPassField.classList.add("parent-pass-field");
    const changePassField = document.createElement("div");
    changePassField.classList.add("change-pass-field");
    const passesField = document.createElement("div");
    passesField.classList.add("passes-field");
    const buttonsField = document.createElement("div");
    buttonsField.classList.add("buttons-field");
    const prevPass = document.createElement("input");
    prevPass.id = "prev-pass";
    prevPass.type = "password";
    const prevPassLabel = document.createElement("label");
    prevPassLabel.htmlFor = "prev-pass";
    prevPassLabel.textContent = "Previous password:";
    const newPass = document.createElement("input");
    newPass.id = "new-pass";
    newPass.type = "password";
    const newPassLabel = document.createElement("label");
    newPassLabel.htmlFor = "new-pass";
    newPassLabel.textContent = "New password:"
    const newPassRep = document.createElement("input");
    newPassRep.id = "new-pass-rep";
    newPassRep.type = "password";
    const newPassRepLabel = document.createElement("label");
    newPassRepLabel.htmlFor = "new-pass-rep";
    newPassRepLabel.textContent = "Repeat new password:";
    passesField.append(prevPassLabel, prevPass, newPassLabel, newPass, newPassRepLabel, newPassRep);
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("submit-btn-change-pass");
    submitBtn.textContent = "Change password";
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-btn-change-pass");
    cancelBtn.textContent = "Cancel";
    buttonsField.append(submitBtn, cancelBtn);
    changePassField.append(passesField, buttonsField);
    parentPassField.append(changePassField);
    document.body.append(parentPassField);

    submitBtn.addEventListener("click", async () => {
      const prevPassValue = prevPass.value;
      const newPassValue = newPass.value;
      const newPassRepValue = newPassRep.value;
      if (prevPassValue == "" || newPassValue == "") {
        alert("Fill the password fields");
      } else {
        if (newPassValue === newPassRepValue) {
          const option = {
            method: "PUT"
          }
          const request = await fetch(`/api/changePass/${loggedUser}&${prevPassValue}/${newPassValue}`, option);
          const json = await request.json();
          if (json === "password changed") {
            alert("Password successfully changed");
            document.body.removeChild(parentPassField);
            if (rememberMeBool) {
              savedPass = newPassValue;
              localStorage.setItem("loggedUser", JSON.stringify([loggedUser, savedPass, rememberMeBool]));
            }
          } else if (json === "prevPass doesn't match") {
            alert("Previous password doesn't match!");
          }
        } else {
          alert("Fields: New password and Repeat new password don't match!")
        }
      }
      
      
    })
    cancelBtn.addEventListener("click", () => {
      document.body.removeChild(parentPassField);
    })
  })

  document.querySelector(".delete-account-js").addEventListener("click", async ()=>{
    if (confirm("Are You sure? When you delete your account, your entire training history is deleted and cannot be restored.")) {
      const api_url = `/api/${loggedUser}`;
      const options = {
        method: "DELETE"
      };
      const response = await fetch(api_url, options);
      const json = await response.json();
      loggedUser = "";
      savedPass = "";
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      regLogField.append(userNameField, userNameMenu);
      isMenuVisible = false;
      rememberMeBool = false;
      regLogField.removeChild(userNameField);
      regLogField.removeChild(userNameMenu);
      regLogField.append(registerBtn, loginBtn);
      
      const routineListHTML = document.querySelector(".js-routine-list");
      const loginRequired = document.createElement("div");
      loginRequired.classList.add("login-required");
      loginRequired.textContent = "Login first to track sport history.";
      routineListHTML.innerHTML = "";
      routineListHTML.append(loginRequired);
    }
  })

  document.querySelector(".delete-history-js").addEventListener("click", async ()=>{
    if (confirm("Are You sure? Your entire training history will be deleted and cannot be restored.")) {
      const options = {
        method: "DELETE"
      }
      const request = await fetch(`/api/deleteHS/${loggedUser}`, options);
      const json = await request.json();
      routineList = json;
      renderRoutine(routineList);
      document.querySelector(".user-name-menu").classList.remove("is-shown");
    }
  })
  document.querySelector(".log-out-js").addEventListener("click", ()=>{
    loggedUser = "";
    savedPass = "";
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    isMenuVisible = false;
    rememberMeBool = false;
    regLogField.removeChild(userNameField);
    regLogField.removeChild(userNameMenu);
    regLogField.append(registerBtn, loginBtn);
    const routineList = document.querySelector(".js-routine-list");
    const loginRequired = document.createElement("div");
    loginRequired.classList.add("login-required");
    loginRequired.textContent = "Login first to track sport history.";
    routineList.innerHTML = "";
    routineList.append(loginRequired);
  });
  userNameField.addEventListener("click", toggleMenu);
}

function toggleMenu() {
  if (isMenuVisible) {
    document.querySelector(".user-name-menu").classList.remove("is-shown");
    isMenuVisible = false;
  } else {
    document.querySelector(".user-name-menu").classList.add("is-shown");
    isMenuVisible = true;
  }
}

function clickOutside(event) {
  if (isMenuVisible && !document.querySelector(".user-name-menu").contains(event.target)) {
    toggleMenu();
  }
}
document.addEventListener("mousedown", clickOutside);

async function checkLogin(loginValue) {
  const option = {
    method: "GET"
  };
  const request = await fetch(`/api/checkLogin/${loginValue}`, option);
  const json = await request.json();
  if (json === "dobro") {
    return false;
  } else {
    return true;
  }
}
// Training history JS

let sortedListByDate = true;
let sortedByDateBack = false;
let sortedListByName = false;
let sortedByNameBack = false;

async function enter() {
  const routine = document.querySelector('.js-input-routine');
  let routineInput = routine.value;
  const sets = document.querySelector('.js-amount-of-sets');
  let setsInput = sets.value;
  const reps = document.querySelector('.js-amount-of-reps');
  let repsInput = reps.value;
  const date = document.querySelector('.js-date').value;
  const uniqueId = () => {
    return Number(Math.floor(Math.random() * Date.now()));
  }
  if (routine.value == 0 || sets.value == 0 || reps.value == 0 || date == 0) {
    document.querySelector('.alert-message').classList.add("is-alert");
    setTimeout(()=>{document.querySelector(".alert-message").classList.remove("is-alert")}, 2900);
  }
  else {
    if (loggedUser === "") {
      document.querySelector(".login-alert").classList.add("show");
      setTimeout(()=>{document.querySelector(".login-alert").classList.remove("show")}, 2900);
    } else {
      const data = {name: routineInput, reps: repsInput, sets: setsInput, date: date, id: uniqueId()};
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      const response = await fetch(`/api/${loggedUser}`, options);
      const responseJson = await response.json();
      routineList = responseJson;
      renderRoutine(routineList.sort(compareDate));

      routine.value = '';
      sets.value = "";
      reps.value = "";

      if (sortedListByDate === true && sortedByDateBack === false) {
        renderRoutine(routineList.sort(compareDate));
      }
      else if (sortedListByDate === true && sortedByDateBack === true) {
        renderRoutine(routineList.sort(compareDateBack));
      }
      else if (sortedListByName === true && sortedByNameBack === false) {
        renderRoutine(routineList.sort(compareNameBack));
      }
      else if (sortedListByName === true && sortedByNameBack === true) {
        renderRoutine(routineList.sort(compareName));
      }
      
      document.querySelector('.alert-message').classList.remove("is-alert");
    }
  }
}

function renderRoutine(sortedRoutine) {
  const routineListHTML = document.querySelector(".js-routine-list");
  const interimHTML = document.createElement("div");

  sortedRoutine.forEach(item=>{
    const {name, reps, sets, date, id} = item;
    const container = document.createElement("div");
    container.classList.add(`js-container-${id}`, "container");
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name-div");
    nameDiv.textContent = name;
    const repDiv = document.createElement("div");
    repDiv.classList.add(`js-rep-div-${id}`, "rep-div");
    repDiv.textContent = `repetitions: ${reps}`;
    const setDiv = document.createElement("div");
    setDiv.classList.add(`js-set-div-${id}`, "set-div");
    setDiv.textContent = `sets: ${sets}`;
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date-div");
    dateDiv.textContent = `date: ${date}`;
    const buttonWrap = document.createElement("div");
    buttonWrap.classList.add("button-wrap");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button", "js-delete-button");
    deleteBtn.dataset.deleteId = id;
    deleteBtn.textContent = "Delete";
    const updateBtn = document.createElement("button");
    updateBtn.classList.add("update-button", "js-update-button");
    updateBtn.dataset.updateId = id;
    updateBtn.textContent = "Update";
    const repInput = document.createElement("input");
    repInput.classList.add("rep-input", "js-rep-input", `js-input-rep-${id}`);
    repInput.type = "number/text";
    repInput.min = 0;
    repInput.placeholder = "Reps";
    const setInput = document.createElement("input");
    setInput.classList.add("set-input", "js-set-input", `js-input-set-${id}`);
    setInput.type = "number";
    setInput.min = 0;
    setInput.placeholder = "Sets";
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("save-button", "js-save-button");
    saveBtn.dataset.saveId = id;
    saveBtn.textContent = "Save";
    const alertMsg = document.createElement("div");
    alertMsg.classList.add("alert-message-reps-sets", `js-alert-message-reps-sets-${id}`);
    alertMsg.textContent = "Enter reps and sets";
    buttonWrap.append(deleteBtn, updateBtn, repInput, setInput, saveBtn, alertMsg)
    container.append(nameDiv, repDiv, setDiv, dateDiv, buttonWrap /* deleteBtn, updateBtn, repInput, setInput, saveBtn, alertMsg */);
    interimHTML.append(container);
  })
  if (routineList=="") {
    routineListHTML.innerHTML = `<div class="no-data-div">There is no data</div>`;
  } else {
    routineListHTML.innerHTML = "";
    routineListHTML.append(interimHTML);
  }

  document.querySelectorAll(".js-delete-button").forEach((button)=>{
    button.addEventListener('click', async (e)=>{
      const exerId = Number(button.dataset.deleteId);
      const options = {
        method: "DELETE"
      };
      const request = await fetch(`/api/${loggedUser}/${exerId}`, options);
      const json = await request.json();
      routineList = json;
      const searchString = filter.value;
      changeFilter(searchString);
    })
  })

  document.querySelectorAll(".js-update-button").forEach((button)=>{
    button.addEventListener('click', ()=>{
      const elements = document.querySelectorAll(".container");
      let busy = false;
      for (i=0; i<elements.length; i++) {
        if (elements[i].classList.contains("is-updating")) {
          busy = true;
        }
      }
      if (busy) {
        alert("Finish updating previous element first!");
      } else {
        document.querySelector(`.js-container-${button.dataset.updateId}`).classList.add("is-updating");
      }
    })
  })

  document.querySelectorAll(".js-save-button").forEach((button)=>{
    button.addEventListener('click', async ()=>{
      const saveButtonId = button.dataset.saveId;
      let newSets = Number(document.querySelector(`.js-input-set-${button.dataset.saveId}`).value);
      let newReps = document.querySelector(`.js-input-rep-${button.dataset.saveId}`).value;
      if (newSets == 0 || newReps == 0) {
        document.querySelector(`.js-alert-message-reps-sets-${saveButtonId}`).classList.add('empty-fields');
      }
      else {
        document.querySelector(`.js-container-${button.dataset.saveId}`).classList.remove("is-updating");
        document.querySelector(`.js-alert-message-reps-sets-${saveButtonId}`).classList.remove('empty-fields');
        const newData = {newSets, newReps};
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newData)
        };
        //solve this
        const request = await fetch(`/api/${loggedUser}/${saveButtonId}`, options)
        const json = await request.json();
        routineList = json;
        const searchString = filter.value;
        changeFilter(searchString);
      }
    })
  })
}

function changeFilter(searchString) {
  const filtered = routineList.filter((exercise) => {return ((exercise.name).toLowerCase().includes(searchString.toLowerCase()));});
  if (searchString === "") {
    if (sortedListByDate === true && sortedByDateBack === false) {
      renderRoutine(filtered.sort(compareDate));
    }
    else if (sortedListByDate === true && sortedByDateBack === true) {
      renderRoutine(filtered.sort(compareDateBack));
    }
    else if (sortedListByName === true && sortedByNameBack === false) {
      renderRoutine(filtered.sort(compareNameBack));
    }
    else if (sortedListByName === true && sortedByNameBack === true) {
      renderRoutine(filtered.sort(compareName));
    }
  } else {
    renderRoutine(filtered);
  }
}

filter.addEventListener('keyup', (e) => {
  const searchString = e.target.value;
  changeFilter(searchString);
})
filter.addEventListener('focus', (e) => {
  const searchString = e.target.value;
  changeFilter(searchString);
})

document.querySelector('.js-submit-btn').addEventListener('click', enter);

document.querySelector(".js-input-routine").addEventListener('focus', ()=>{
  document.querySelector('.alert-message').classList.remove("is-alert");
})
document.querySelector('.js-amount-of-reps').addEventListener('focus', ()=>{
  document.querySelector('.alert-message').classList.remove('is-alert');
})
document.querySelector('.js-amount-of-sets').addEventListener('focus', ()=>{
  document.querySelector('.alert-message').classList.remove('is-alert');
})
document.querySelector('.js-date').addEventListener('focus', ()=>{
  document.querySelector('.alert-message').classList.remove('is-alert');
})


function compareDate (a,b) {
  if (a.date < b.date) {
    return 1;
  }
  if (a.date > b.date) {
    return -1;
  }
  return 0;
}

function compareDateBack (a,b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

function compareName (a,b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function compareNameBack (a,b) {
  if (a.name < b.name) {
    return 1;
  }
  if (a.name > b.name) {
    return -1;
  }
  return 0;
}

document.querySelector('.js-sort-by-name-btn').addEventListener('click', ()=>{
  sortedListByName = true;
  sortedListByDate = false;
  sortedByDateBack = false;
  const searchString = filter.value;
  const filtered = routineList.filter((exercise) => {return ((exercise.name).toLowerCase().includes(searchString.toLowerCase()));});
  if (sortedListByName === true && sortedByNameBack === false) {
    renderRoutine(filtered.sort(compareName));
    sortedByNameBack = true;
  }
  else if (sortedListByName === true && sortedByNameBack === true) {
    renderRoutine(filtered.sort(compareNameBack));
    sortedByNameBack = false;
  }
})

document.querySelector('.js-sort-by-date-btn').addEventListener('click', ()=>{
  sortedListByDate = true;
  sortedListByName = false;
  sortedByNameBack = false;
  const searchString = filter.value;
  const filtered = routineList.filter((exercise) => {return ((exercise.name).toLowerCase().includes(searchString.toLowerCase()));});
  if (sortedListByDate === true && sortedByDateBack === false) {
    renderRoutine(filtered.sort(compareDateBack));
    sortedByDateBack = true;
  }
  else if (sortedListByDate === true && sortedByDateBack === true) {
    renderRoutine(filtered.sort(compareDate));
    sortedByDateBack = false;
  }
});

document.querySelector('.js-info-btn').addEventListener('click', ()=>{
  document.querySelector('.div-info').classList.add('is-shown');
})
document.querySelector('.js-div-info-close-btn').addEventListener('click', ()=>{
  document.querySelector('.div-info').classList.remove('is-shown');
})

function scrollWindow() {
  if (document.documentElement.scrollTop > 100) {
    document.querySelector('.js-scroll-top').style.display = "initial";
  }
  else {
    document.querySelector('.js-scroll-top').style.display = "none";
  }
}

window.onscroll = function() {scrollWindow()};



