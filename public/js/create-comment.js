const cmtbutton = document.querySelectorAll(".confirmComment");

const confirmComment = async (event) => {
  event.preventDefault();
  console.log(event.target)

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
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

// cmtbutton.forEach((button) => {
//   button.addEventListener("click", confirmComment);
// });

document
  .querySelector('.confirmComment')
  .addEventListener('click', confirmComment);