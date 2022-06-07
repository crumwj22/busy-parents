const newFormHandler = async (event) => {
  event.preventDefault();

  const pickup_Location = document.querySelector('#pickup_location').value.trim();
  const dropoff_location = document.querySelector('#dropoff_location').value.trim();
  const availability = document.querySelector('#availability').value.trim();

  if (pickup_Location && dropoff_location && availability) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ pickup_Location, dropoff_location, availability }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Failed to create driver post');
    }
  }
};

document
  .querySelector('.new-driver-form')
  .addEventListener('submit', newFormHandler);