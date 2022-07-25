// login section
const loginForm = document.querySelector("#login-form");
const warning = document.getElementById("warning");

document.addEventListener("DOMContentLoaded", () => {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    localStorage.setItem("storageName", email);
    const password = loginForm.password.value;
    if (email === "eda.belge@hotmail.com" && password === "Eda123") {
      alert("Login is successful ! You are being redirected to the homepage.");
      window.location.replace("./weather-page.html");
    } else {
      warning.innerHTML = "Incorrect Email and/or password.";
      setTimeout(() => {
        warning.innerHTML = "";
      }, 4000);
    }
  });
});

// email type section
const email = document.getElementById("email-field");
email.addEventListener("input", () => {
  const emailBox = document.querySelector(".emailSection");
  const emailText = document.querySelector(".emailText");
  const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;

  if (email.value.match(emailPattern)) {
    emailBox.classList.add("valid");
    emailBox.classList.remove("invalid");
    emailText.innerHTML = "";
  } else {
    emailBox.classList.add("invalid");
    emailBox.classList.remove("valid");
    emailText.innerHTML = "Invalid type Email !";
  }
});

// password visibility section
const visibilityButton = document.getElementById("visibilityButton");
visibilityButton.addEventListener("click", toggleVisibility);

function toggleVisibility() {
  const passwordInput = document.getElementById("password-field");
  const eyeicon = document.getElementById("eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeicon.innerText = "visibility_off";
  } else {
    passwordInput.type = "password";
    eyeicon.innerText = "visibility";
  }
}
