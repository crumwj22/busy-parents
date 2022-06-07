const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/driver/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Failed to delete driver post');
    }
  }
};

document
  .querySelector('.driver-post')
  .addEventListener('click', delButtonHandler);