// const cbuttons = document.querySelectorAll(".confirmComment");
// const addComment = async (event) => {
//   event.preventDefault();
//   console.log("comment added");

//   const comment_id = event.target.getAttribute("data-post-id");
//   console.log(post_id);
//   if (post_id) {
//     const response = await fetch("/api/addComments/" + comment_id, {
//       method: "PUT",
//       body: JSON.stringify({ comment_id }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       //reload the page on success - to see the comment post
//       document.location.reload();
//     } else {
//       alert(response.statusText);
//     }
//   }
// };


const newComment = async (event) => {
  event.preventDefault();
  console.log("add comment");

  const comment_text = document.querySelector('#comment').value.trim();
  const driver_id = event.target.getAttribute('data-id');
  console.log(comment);

  if (comment_text) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment_text, driver_id }),
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

// newComment.forEach((button) => {
//   button.addEventListener("click", newComment);
// });
document
  .querySelector('#confirmComment')
  .addEventListener('click', newComment);