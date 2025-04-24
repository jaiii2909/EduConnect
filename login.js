const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Toggle between login and register forms
loginToggle.addEventListener('click', () => {
  loginToggle.classList.add('active');
  registerToggle.classList.remove('active');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
});

registerToggle.addEventListener('click', () => {
  registerToggle.classList.add('active');
  loginToggle.classList.remove('active');
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
});

// Handle login form submission
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');

  // Reset errors
  document.getElementById('loginEmailError').textContent = '';
  document.getElementById('loginPasswordError').textContent = '';

  let valid = true;

  if (!email.value.includes('@')) {
    document.getElementById('loginEmailError').textContent = 'Enter a valid email.';
    valid = false;
  }

  if (password.value.length < 6) {
    document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters.';
    valid = false;
  }

  if (!valid) return;

  const loginData = {
    email: email.value,
    password: password.value
  };

  fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Login successful!' && data.user && data.user.id) {
        alert(data.message);
        // Store user ID in localStorage
        localStorage.setItem("userId", data.user.id);
        loginForm.reset();
        window.location.href = 'res-lib.html';
      } else {
        alert(data.message || 'Invalid login');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
    });
});

// Handle register form submission
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('registerEmail');
  const skills = document.getElementById('skills');
  const role = document.getElementById('role');
  const password = document.getElementById('registerPassword');
  const confirmPassword = document.getElementById('confirmPassword');

  // Reset errors
  document.getElementById('nameError').textContent = '';
  document.getElementById('registerEmailError').textContent = '';
  document.getElementById('registerPasswordError').textContent = '';
  document.getElementById('confirmPasswordError').textContent = '';
  document.getElementById('roleError').textContent = '';
  document.getElementById('skillserror').textContent = '';

  let valid = true;

  if (name.value.trim() === '') {
    document.getElementById('nameError').textContent = 'Name is required.';
    valid = false;
  }

  if (!email.value.includes('@')) {
    document.getElementById('registerEmailError').textContent = 'Enter a valid email.';
    valid = false;
  }

  if (skills.value.trim() === '') {
    document.getElementById('skillserror').textContent = 'Skills is required.';
    valid = false;
  }

  if (password.value.length < 6) {
    document.getElementById('registerPasswordError').textContent = 'Password must be at least 6 characters.';
    valid = false;
  }

  if (confirmPassword.value !== password.value) {
    document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
    valid = false;
  }

  if (role.value === '') {
    document.getElementById('roleError').textContent = 'Please select a role.';
    valid = false;
  }

  if (!valid) return;

  const userData = {
    name: name.value,
    email: email.value,
    role: role.value,
    skills: skills.value,
    password: password.value
  };

  fetch('http://localhost:5000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === "User registered successfully!" && data.user && data.user.id) {
        alert(data.message);
        // Store user ID in localStorage
        localStorage.setItem("userId", data.user.id);
        registerForm.reset();
        window.location.href = 'res-lib.html';
      } else {
        alert(data.message || 'Registration failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    });
});
