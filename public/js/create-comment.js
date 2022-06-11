const newComment = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector('#comment').value.trim();
  const driver_id = event.target.getAttribute('data-id');

  if (comment_text) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment_text, driver_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //reload the page on success - to see the comment post
      document.location.replace(`/dashboard${driver_id}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#confirmComment')
  .addEventListener('click', newComment);