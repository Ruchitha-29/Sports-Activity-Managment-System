document.addEventListener('DOMContentLoaded', function() {
  // Check user role first
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  // Populate events dropdown
  fetch('http://localhost:5000/api/events')
    .then(res => res.json())
    .then(events => {
      const eventSelect = document.getElementById('result-event');
      eventSelect.innerHTML = '';
      if (events.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No events available';
        eventSelect.appendChild(option);
      } else {
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select Event';
        eventSelect.appendChild(defaultOption);
        events.forEach(event => {
          const option = document.createElement('option');
          option.value = event.id;
          option.textContent = event.title;
          eventSelect.appendChild(option);
        });
      }
    })
    .catch(() => {
      const eventSelect = document.getElementById('result-event');
      eventSelect.innerHTML = '';
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'Error loading events';
      eventSelect.appendChild(option);
    });

  // Populate users dropdown
  fetch('http://localhost:5000/api/users')
    .then(res => res.json())
    .then(users => {
      const userSelect = document.getElementById('result-user');
      userSelect.innerHTML = '';
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Select Participant';
      userSelect.appendChild(defaultOption);
      users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.username;
        userSelect.appendChild(option);
      });
    });

  // Handle add result form submit - only for admins
  const addResultForm = document.getElementById('add-result-form');
  const formMsg = document.getElementById('result-form-msg');
  
  if (addResultForm) {
    addResultForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Check if user is admin
      if (!isAdmin) {
        formMsg.style.color = '#ff4d4d';
        formMsg.textContent = 'Access denied. Only administrators can add results.';
        return;
      }
      
      formMsg.textContent = '';
      const resultData = {
        event_id: document.getElementById('result-event').value,
        user_id: document.getElementById('result-user').value,
        position: document.getElementById('result-position').value
      };
      fetch('http://localhost:5000/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultData)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            formMsg.style.color = '#4dff88';
            formMsg.textContent = 'Result added successfully!';
            addResultForm.reset();
          } else {
            formMsg.style.color = '#ff4d4d';
            formMsg.textContent = data.message || 'Failed to add result.';
          }
        })
        .catch(err => {
          formMsg.style.color = '#ff4d4d';
          formMsg.textContent = 'Server error. Please try again later.';
        });
    });
  }
}); 