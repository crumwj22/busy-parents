const newComment = async (event) => {
  event.preventDefault();

  const body = document.querySelector('#commentBody').value.trim();
  const post_id = event.target.getAttribute('data-post-id');

  if (body) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ body, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //reload the page on success - to see the comment post
      document.location.replace(`/singlepost/${post_id}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#comment-submit-btn')
  .addEventListener('click', newComment);