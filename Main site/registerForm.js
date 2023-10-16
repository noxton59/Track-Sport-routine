document.querySelector(".register-btn-js").addEventListener('click', ()=>{
  document.querySelector(".reg-form").classList.add("is-shown")
})
document.querySelector(".form-field-close-btn").addEventListener("click", ()=>{
  document.querySelector(".reg-form").classList.remove("is-shown");
  document.querySelector(".login-field-reg-js").value = "";
  document.querySelector(".first-name-reg-js").value = "";
  document.querySelector(".second-name-reg-js").value = "";
  document.querySelector(".fpassword-reg-js").value = "";
  document.querySelector(".spassword-reg-js").value = "";
})
document.querySelector(".login-btn").addEventListener("click", ()=>{
  document.querySelector(".login-field").classList.add("is-shown")
})
document.querySelector(".login-form-close-btn").addEventListener("click", ()=>{
  document.querySelector(".login-field").classList.remove("is-shown")
})
document.querySelector(".sign-in-btn-js").addEventListener("click", ()=>{
  document.querySelector(".reg-form").classList.remove("is-shown");
  document.querySelector(".login-field").classList.add("is-shown");
})
document.querySelector(".reg-form-btn-js").addEventListener("click", ()=>{
  document.querySelector(".login-field").classList.remove("is-shown");
  document.querySelector(".reg-form").classList.add("is-shown");
})

const users = JSON.parse(localStorage.getItem("users")) || [];

function createUser() {
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
    document.querySelector(".reg-warning-js").classList.add("is-shown")
  }
  else {
    if (fpasswordValue === spasswordValue) {
      if (users[0] == undefined) {
        users.push({login: loginValue, firstName: firstNameValue, secondName: secondNameValue, password: spasswordValue})
        localStorage.setItem("users", JSON.stringify(users))
        console.log(users)
        login.value = "";
        firstName.value = "";
        secondName.value = "";
        fpassword.value = "";
        spassword.value = "";
        document.querySelector(".reg-form").classList.remove("is-shown");
        document.querySelector(".reg-success-bg").classList.add("is-shown");
        setTimeout(()=>{document.querySelector(".reg-success-bg").classList.remove("is-shown");}, 1900)
      }
      else if (checklogin(loginValue)) {
        alert("This login already exists")
      }
      else {
        users.push({login: loginValue, firstName: firstNameValue, secondName: secondNameValue, password: spasswordValue})
        localStorage.setItem("users", JSON.stringify(users))
        console.log(users)
        login.value = "";
        firstName.value = "";
        secondName.value = "";
        fpassword.value = "";
        spassword.value = "";
        document.querySelector(".reg-form").classList.remove("is-shown");
        document.querySelector(".reg-success-bg").classList.add("is-shown");
        setTimeout(()=>{document.querySelector(".reg-success-bg").classList.remove("is-shown");}, 1900)
      }
    }
    else {
      alert("Passwords don't match")
      return
    }
  }
}

document.querySelector(".register-button-js").addEventListener("click", createUser)

function logIn() {
  userLoginInput = document.querySelector(".login-input-log-js");
  userLogin = userLoginInput.value;
  userPasswordInput = document.querySelector(".password-input-log-js");
  userPassword = userPasswordInput.value;
  if (checklogin(userLogin)) {
    if (checkPassword(userPassword)) {
      document.querySelector(".login-field").classList.remove("is-shown");
      document.querySelector(".logged-success-field").classList.add("is-shown");
      let userName;
      users.forEach((user)=>{
        if (userLogin == user.login) {
          userName = user.firstName +" "+ user.secondName;
        }
      })
      document.querySelector(".logged-success").innerHTML = `Welcome ${userName}`;
      setTimeout(()=>{document.querySelector(".logged-success-field").classList.remove("is-shown")}, 1900);
      userLoginInput.value = "";
      userPasswordInput.value = "";
      document.querySelector(".reg-log-field").innerHTML = `
      <div class="user-name-field">${userName}</div>
      <div class="user-name-menu">
        <div class="delete-account delete-account-js">Delete account</div>
        <div class="delete-history delete-history-js">Delete training history</div>
        <div class="log-out log-out-js">Log out</div>
      </div>`;
      document.querySelector(".user-name-field").addEventListener("click", ()=>{
        if(document.querySelector(".user-name-menu").classList.contains("is-shown")) {
          document.querySelector(".user-name-menu").classList.remove("is-shown");
        }
        else {
          document.querySelector(".user-name-menu").classList.add("is-shown");
        }
      })
      document.querySelector(".delete-account-js").addEventListener("click", ()=>{
        if (confirm("Are you sure? When you delete your account, your entire training history is deleted and cannot be restored.")) {
          users.forEach((user)=>{
            if (userLogin == user.login) {
              users.splice(users.indexOf(user), 1);
              localStorage.setItem("users", JSON.stringify(users));
              document.querySelector(".reg-log-field").innerHTML = `
              <div class="register-btn register-btn-js">Register</div>
              <div class="login-btn">Login</div>`;
              document.querySelector(".login-btn").addEventListener("click", ()=>{
                document.querySelector(".login-field").classList.add("is-shown");
              })
              document.querySelector(".register-btn-js").addEventListener('click', ()=>{
                document.querySelector(".reg-form").classList.add("is-shown");
              })
            }
          })
        }
      })
      document.querySelector(".log-out-js").addEventListener("click", ()=>{
        document.querySelector(".reg-log-field").innerHTML = `
        <div class="register-btn register-btn-js">Register</div>
        <div class="login-btn">Login</div>`;
        document.querySelector(".login-btn").addEventListener("click", ()=>{
          document.querySelector(".login-field").classList.add("is-shown");
        })
        document.querySelector(".register-btn-js").addEventListener('click', ()=>{
          document.querySelector(".reg-form").classList.add("is-shown");
        })
      })
    }
    else {
      alert("Wrong password")
    }
  }
  else {
    alert("User with this login was not found")
  }
}

document.querySelector(".login-btn-log-js").addEventListener("click", logIn);

document.querySelectorAll(".reg-field").forEach((field)=>{
  field.addEventListener("focus", ()=>{
    document.querySelector(".reg-warning").classList.remove("is-shown");
  })
})



function checklogin(loginValue) {
  let matched;
  users.forEach((user)=>{
    if (loginValue == user.login) {
      matched = true;
    }
  })
  return matched;
}

function checkPassword(userPassword) {
  let matchedPassword;
  users.forEach((user)=>{
    if (userLogin == user.login) {
      if (userPassword === user.password) {
        matchedPassword = true;
      }
    }
  })
  return matchedPassword;
}
