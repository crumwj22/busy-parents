const newComment = async (event) => {
  event.preventDefault();

  // const body = document.querySelector('#commentBody').value.trim();
  const post_id = event.target.getAttribute('data-post-id');

  if (comment_text) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment_text, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //reload the page on success - to see the comment post
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#addDriver')
  .addEventListener('submit', commentButtonHandler);

document
  .querySelector('#commentForm')
  .addEventListener('submit', commentFormHandler);

document
  .querySelector('#cancelComment')
  .addEventListener('reset', cancelButtonHandler);
