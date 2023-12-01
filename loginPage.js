"use strict";

const $ = document;
const registerForm = $.querySelector(".sign-up-form");
const usernameInput = $.querySelector(".username");
const passwordInput = $.querySelector(".password");
const emailInput = $.querySelector(".email");
const signinBtn = $.querySelector(".sign-in-btn");
const signupPElem = $.querySelector("#sign-up");
const signinPElem = $.querySelector("#sign-in");
const signInInput = $.querySelector("#sign-in-input");

let db = null;
let objectStore = null;

window.addEventListener("load", () => {
  let DBOpenReq = indexedDB.open("users", 3);
  DBOpenReq.addEventListener("error", (err) => {
    console.warn(err);
  });
  DBOpenReq.addEventListener("success", (event) => {
    db = event.target.result;
    getUsers();
    console.warn(event);
  });

  DBOpenReq.addEventListener("upgradeneeded", (event) => {
    db = event.target.result;

    if (!db.objectStoreNames.contains("users")) {
      objectStore = db.createObjectStore("users", {
        keyPath: "userID",
      });
    }

    console.log("upgrade", db.objectStoreNames);
  });
});

let checkUsername = (event) => {
  let inputValue = event.target.value;
  inputValue.length < 5 &&
    $.documentElement.style.setProperty("--usernameInputColor", "red");
  inputValue.length < 5 ||
    $.documentElement.style.setProperty("--usernameInputColor", "green");
  inputValue.length !== 0 ||
    $.documentElement.style.setProperty(
      "--usernameInputColor",
      "rgba(255,255,255,0.6)"
    );
};
let checkPass = (event) => {
  let pasValue = event.target.value;
  pasValue.length < 8 &&
    $.documentElement.style.setProperty("--passwordInputColor", "red");
  pasValue.length < 8 ||
    $.documentElement.style.setProperty("--passwordInputColor", "green");
  pasValue.length !== 0 ||
    $.documentElement.style.setProperty(
      "--passwordInputColor",
      "rgba(255,255,255,0.6)"
    );
};

let checkEmail = (event) => {
  let emailValue = event.target.value;

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailValue.match(mailformat)) {
    $.documentElement.style.setProperty("--emailInputColor", "green");
    emailInput.focus();
  } else {
    $.documentElement.style.setProperty("--emailInputColor", "red");
    emailInput.focus();
  }

  !emailValue &&
    $.documentElement.style.setProperty(
      "--emailInputColor",
      "rgba(255,255,255,0.6)"
    );
};

usernameInput.addEventListener("keyup", function () {
  checkUsername(event);
});
passwordInput.addEventListener("keyup", function () {
  checkPass(event);
});
emailInput.addEventListener("keyup", function () {
  checkEmail(event);
});

let submitRegister = (event) => {
  event.preventDefault();

  if (
    $.documentElement.style.getPropertyValue("--usernameInputColor") ===
      "green" &&
    $.documentElement.style.getPropertyValue("--passwordInputColor") ===
      "green" &&
    $.documentElement.style.getPropertyValue("--emailInputColor") === "green"
  ) {
    let newUser = {
      userID: Math.floor(Math.random() * 9999),
      name: usernameInput.value,
      password: passwordInput.value,
      email: emailInput.value,
    };
    let tx = createTX("users", "readwrite");
    tx.addEventListener("tx success", (event) => {
      console.log("success", event);
    });

    let store = tx.objectStore("users");

    let request = store.add(newUser);

    clearInfo();

    request.addEventListener("request error", (err) => {
      console.warn("Error", err);
    });
    request.addEventListener("request success", (event) => {
      console.log("success", event);
    });
  } else {
    console.log("input valid informations");
  }
};
//-----------ger users from indexDB
let allUsers = [];
let getUsers = () => {
  let tx = createTX("users", "readonly");
  tx.addEventListener("complete", (event) => {
    console.log("Tx", event);
  });

  let store = tx.objectStore("users");
  let request = store.getAll();

  request.addEventListener("error", (err) => {
    console.warn("get Req Error", err);
  });

  request.addEventListener("success", (event) => {
    let usersData = event.target.result;
    allUsers.push(usersData);

  });

};

//--------------confirm sign in----------

let confirmSignIn = (event) => {
  event.preventDefault();

  let signInInputValue = signInInput.value;
//-----------here-----------
  for(let i in allUsers){
    
    console.log(allUsers[i]);
    if(signInInputValue===allUsers[i].name){
      console.log("yes");
    }
    else{console.log("no");}
  }
};
signinBtn.addEventListener("click", function () {
  confirmSignIn(event);
});
//-----------------------

let createTX = (storeName, mode) => {
  let tx = db.transaction(storeName, mode);
  tx.addEventListener("tx error", (err) => {
    console.warn("Error", err);
  });
  return tx;
};

let clearInfo = () => {
  usernameInput.value = "";
  passwordInput.value = "";
  emailInput.value = "";

  $.documentElement.style.setProperty(
    "--usernameInputColor",
    "rgba(255,255,255,0.6)"
  );
  $.documentElement.style.setProperty(
    "--passwordInputColor",
    "rgba(255,255,255,0.6)"
  );
  $.documentElement.style.setProperty(
    "--emailInputColor",
    "rgba(255,255,255,0.6)"
  );
};

registerForm.addEventListener("submit", function () {
  submitRegister(event);
});

//----------------sign up/in display----------------
signupPElem.addEventListener("click", () => {
  $.documentElement.style.setProperty("--sign-up-display", "none");
  $.documentElement.style.setProperty("--sign-in-display", "block");
});
signinPElem.addEventListener("click", () => {
  $.documentElement.style.setProperty("--sign-in-display", "none");
  $.documentElement.style.setProperty("--sign-up-display", "block");
});
