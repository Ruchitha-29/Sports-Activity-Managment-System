document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signup-form');
  const errorText = document.getElementById('signup-error');
  const successText = document.getElementById('signup-success');

  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    errorText.textContent = '';
    successText.textContent = '';

    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          successText.textContent = 'You are signed up! Now log in.';
          signupForm.reset();
        } else {
          errorText.textContent = data.message || 'Sign up failed.';
        }
      })
      .catch(err => {
        console.error('Sign up error:', err);
        errorText.textContent = 'Server error. Please try again later.';
      });
  });
}); 