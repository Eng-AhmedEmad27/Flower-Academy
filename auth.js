function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    button.textContent = "Hide";
  } else {
    input.type = "password";
    button.textContent = "Show";
  }
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/* Register Validation */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const type = document.getElementById("registerType").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const typeError = document.getElementById("typeError");
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");
    const registerSuccess = document.getElementById("registerSuccess");

    nameError.textContent = "";
    emailError.textContent = "";
    typeError.textContent = "";
    passwordError.textContent = "";
    confirmError.textContent = "";
    registerSuccess.textContent = "";

    let valid = true;

    if (name.length < 3) {
      nameError.textContent = "Name must be at least 3 characters.";
      valid = false;
    }

    if (!isValidEmail(email)) {
      emailError.textContent = "Please enter a valid email.";
      valid = false;
    }

    if (type === "") {
      typeError.textContent = "Please choose account type.";
      valid = false;
    }

    if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      valid = false;
    }

    if (confirmPassword !== password) {
      confirmError.textContent = "Passwords do not match.";
      valid = false;
    }

    if (valid) {
      const user = {
        name: name,
        email: email,
        type: type,
        password: password
      };

      localStorage.setItem("flowerUser", JSON.stringify(user));

      registerSuccess.textContent =
        "Account created successfully! Redirecting to login...";

      setTimeout(function () {
        window.location.href = "login.html";
      }, 1500);
    }
  });
}

/* Login Validation */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const loginEmailError = document.getElementById("loginEmailError");
    const loginPasswordError = document.getElementById("loginPasswordError");
    const loginSuccess = document.getElementById("loginSuccess");
    const loginError = document.getElementById("loginError");

    loginEmailError.textContent = "";
    loginPasswordError.textContent = "";
    loginSuccess.textContent = "";
    loginError.textContent = "";

    let valid = true;

    if (!isValidEmail(email)) {
      loginEmailError.textContent = "Please enter a valid email.";
      valid = false;
    }

    if (password.length < 6) {
      loginPasswordError.textContent = "Password must be at least 6 characters.";
      valid = false;
    }

    if (!valid) return;

    const savedUser = JSON.parse(localStorage.getItem("flowerUser"));

    if (!savedUser) {
      loginError.textContent = "No account found. Please register first.";
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", savedUser.type);

      loginSuccess.textContent = "Login successful! Redirecting...";

      setTimeout(function () {
        window.location.href = "index.html";
      }, 1500);
    } else {
      loginError.textContent = "Incorrect email or password.";
    }
  });
}