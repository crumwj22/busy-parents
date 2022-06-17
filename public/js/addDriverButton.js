const buttons = document.querySelectorAll(".addDriver");
const addDriver = async (event) => {
  event.preventDefault();
  console.log("add driver");

  const post_id = event.target.getAttribute("data-post-id");
  console.log(post_id);
  if (post_id) {
    const response = await fetch("/api/addDriver/" + post_id, {
      method: "PUT",
      body: JSON.stringify({ post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      //reload the page on success - to see the comment post
      document.location.replace(`/my-account`);
    } else {
      alert(response.statusText);
    }
  }
};

//NEED TO ADD DELETE DRIVER BUTTON FUNCTION
buttons.forEach((button) => {
  button.addEventListener("click", addDriver);
});
