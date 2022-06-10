const newComment = async (event) => {
  event.preventDefault();

  // const body = document.querySelector('#commentBody').value.trim();
  const post_id = event.target.getAttribute('data-post-id');

  if (post_id) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //reload the page on success - to see the comment post
      document.location.replace(`/my-account`);
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#commentButton').addEventListener('click', newComment);
