document.addEventListener('DOMContentLoaded', function() {
  // Static sports and coaches
  const sports = [
    { id: 1, name: 'Football' },
    { id: 2, name: 'Basketball' },
    { id: 3, name: 'Cricket' },
    { id: 4, name: 'Badminton' },
    { id: 5, name: 'Tennis' }
  ];
  const coaches = [
    { id: 1, name: 'Mr. Smith' },
    { id: 2, name: 'Ms. Johnson' },
    { id: 3, name: 'Coach Lee' }
  ];

  // Populate sports dropdown
  const sportSelect = document.getElementById('event-sport');
  sports.forEach(sport => {
    const option = document.createElement('option');
    option.value = sport.name;
    option.textContent = sport.name;
    sportSelect.appendChild(option);
  });

  // Populate coaches dropdown
  const coachSelect = document.getElementById('event-coach');
  coaches.forEach(coach => {
    const option = document.createElement('option');
    option.value = coach.name;
    option.textContent = coach.name;
    coachSelect.appendChild(option);
  });

  // Handle add event form submit
  const addEventForm = document.getElementById('add-event-form');
  const formMsg = document.getElementById('event-form-msg');
  addEventForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formMsg.textContent = '';
    const eventData = {
      title: document.getElementById('event-title').value.trim(),
      sport: document.getElementById('event-sport').value,
      date: document.getElementById('event-date').value,
      location: document.getElementById('event-location').value.trim(),
      description: document.getElementById('event-description').value.trim(),
      coach: document.getElementById('event-coach').value
    };
    fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          formMsg.style.color = '#4dff88';
          formMsg.textContent = 'Event added successfully!';
          addEventForm.reset();
        } else {
          formMsg.style.color = '#ff4d4d';
          formMsg.textContent = data.message || 'Failed to add event.';
        }
      })
      .catch(err => {
        formMsg.style.color = '#ff4d4d';
        formMsg.textContent = 'Server error. Please try again later.';
      });
  });
}); 