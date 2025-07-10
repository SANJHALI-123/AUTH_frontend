// Show message function
function showMessage(message, isSuccess) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.className = 'message show ' + (isSuccess ? 'success' : 'error');
    
    setTimeout(() => {
      messageEl.classList.remove('show');
    }, 3000);
  }
  
  // Signup Form Handling
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        // Show loading state
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing Up...';
        
        const response = await fetch('https://auth-backend-dq99.onrender.com/api/auth/signup', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          showMessage('Signup successful! Redirecting to login...', true);
          // Automatic redirect after 1.5 seconds with email parameter
          setTimeout(() => {
           window.location.href = `https://auth-frontend-self.vercel.app/login.html?email=${encodeURIComponent(email)}`;

          }, 1500);
        } else {
          showMessage(data.message || 'Signup failed', false);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign Up';
        }
      } catch (error) {
        showMessage('Network error. Please try again.', false);
        console.error('Signup error:', error);
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign Up';
      }
    });
  }
  
  // Login Form Handling
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    // Pre-fill email if coming from signup
    document.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get('email');
      if (email && document.getElementById('loginEmail')) {
        document.getElementById('loginEmail').value = email;
      }
    });
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      try {
        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        
        const response = await fetch('https://auth-backend-dq99.onrender.com/api/auth/login', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          showMessage('Login successful!', true);
          // Reset button state
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign In';
          // Here you can redirect to a dashboard or home page
          // window.location.href = 'dashboard.html';
        } else {
          showMessage(data.message || 'Login failed', false);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign In';
        }
      } catch (error) {
        showMessage('Network error. Please try again.', false);
        console.error('Login error:', error);
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In';
      }
    });
  }