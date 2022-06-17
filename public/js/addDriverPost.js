// Code here handles what happens when a user submits a new Driver on the form.
// Effectively it takes the form inputs then sends it to the server to save in the DB.
$(document).ready(() => {
  // when user clicks add-btn
  $("#add-btn").on("click", event => {
    event.preventDefault();

    // make a newPet obj
    const newDriver = {
      // name from name input
      name: $("#name")
        .val()
        .trim(),

      pickup_Location: $('#description')
        .val()
        .trim(),

      dropoff_Location: $("#breed")
        .val()
        .trim(),

      date_created: $("#age")
        .val()
        .trim(),

      availability: $("#gender")
        .val()
        .trim(),

    };

    // send an AJAX POST-request with jQuery
    $.post("/api/new", newDriver)
      // on success, run this callback
      .then(data => {
        // log the data we found
        console.log(data);
        // tell the user we're adding a character with an alert window
        alert("Adding pet...");
      });

    // empty each input box by replacing the value with an empty string
    $("#name").val("");
    $("#pickup_Location").val("");
    $("#dropoff_Location").val("");
    $("#date_created").val("");
    $("#age").val("");
    $("#user_id").val("");


    // redirect to 

    $.get("/dashboard", isAuthenticated, (req, res) => {

      res.render("dashboard", {});
    });
  });
});

// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const pickup_Location = document.querySelector('#pickup_location').value.trim();
//   const dropoff_location = document.querySelector('#dropoff_location').value.trim();
//   const availability = document.querySelector('#availability').value.trim();

//   if (pickup_Location && dropoff_location && availability) {
//     const response = await fetch(`/api/projects`, {
//       method: 'POST',
//       body: JSON.stringify({ pickup_Location, dropoff_location, availability }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/homepage');
//     } else {
//       alert('Failed to create driver post');
//     }
//   }
// };

// document
//   .querySelector('.new-driver-form')
//   .addEventListener('submit', newFormHandler);